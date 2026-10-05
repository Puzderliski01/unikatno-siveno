/**
 * Optimizacija slika za web.
 *
 * Za svaku sliku u public/ pravi:
 *   1. kompresovanu JPG/PNG verziju (kvalitet 82) — kao fallback
 *   2. WebP verziju (kvalitet 80) — koristi se u <picture> elementu
 *
 * Pokretanje:  npm run optimize-images
 * Originali su u Git-u, pa je sve reverzibilno preko `git checkout public/`.
 */
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, extname, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

const RASTER_EXTS = new Set(['.jpg', '.jpeg', '.png']);
const MAX_EDGE = 1400; // dovoljno za Retina prikaz u gridu i modalu

let before = 0;
let after = 0;
let webpMade = 0;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  if (!RASTER_EXTS.has(ext)) return;

  const webpPath = file.slice(0, -ext.length) + '.webp';

  // Idempotentnost: ako WebP već postoji, ne pravi ga ponovo (izbegava degradaciju).
  // ALI ako je original i dalje prevelik (npr. zaključan od OneDrive-a ranije),
  // ipak pokušaj da ga kompresuješ — WebP ostaje netaknut.
  const hasWebp = await stat(webpPath).then(() => true).catch(() => false);
  if (hasWebp) {
    const s = (await stat(file)).size;
    webpMade += (await stat(webpPath)).size;

    const OVERSIZE = 400 * 1024; // >400 KB za web = vredno još jednog pokušaja
    if (s <= OVERSIZE) {
      before += s;
      after += s;
      console.log(`${relative(PUBLIC, file).padEnd(45)} preskočeno (webp postoji)`);
      return;
    }
    console.log(`${relative(PUBLIC, file).padEnd(45)} original je još ${(s / 1024).toFixed(0)} KB — pokušavam kompresiju`);
    // Nastavi ispod: pravi se samo nova verzija originala, webp se ne dira
  }

  const meta = await sharp(file).metadata();
  const needsResize = Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE;

  const sizeBefore = (await stat(file)).size;
  before += sizeBefore;

  // 1) Kompresovana verzija originalnog formata
  const pipeline = sharp(file).rotate(); // poštuj EXIF orijentaciju
  if (needsResize) pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });

  const tmpPath = file + '.tmp';
  if (ext === '.png') {
    await pipeline.png({ compressionLevel: 9, palette: true, quality: 85 }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(tmpPath);
  }

  // Zameni original. Windows/OneDrive brane `unlink` pa idemo direktno `rename`
  // (Node na Windows-u koristi MOVEFILE_REPLACE_EXISTING → radi i preko postojećeg).
  const { rename, unlink } = await import('node:fs/promises');
  let replaced = true;
  try {
    await rename(tmpPath, file);
  } catch (err) {
    // Rezervni način: ako je fajl zaključan, ipak pokušaj unlink pa rename
    await unlink(file).catch(() => {});
    try {
      await rename(tmpPath, file);
    } catch (e) {
      console.warn(`  ! original zaključan (${err.code || e.code}): ${relative(PUBLIC, file)} — pravim samo WebP`);
      replaced = false;
      await unlink(tmpPath).catch(() => {});
    }
  }

  const sizeAfter = (await stat(file)).size;
  after += sizeAfter;

  // 2) WebP verzija pored originala (čita original — zamenjen ili ne)
  if (!hasWebp) {
    const w = sharp(file).rotate();
    if (needsResize) w.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
    await w.webp({ quality: 80, effort: 5 }).toFile(webpPath);
  }
  const sizeWebp = (await stat(webpPath)).size;
  if (!hasWebp) webpMade += sizeWebp;

  console.log(
    `${relative(PUBLIC, file).padEnd(45)} ${(sizeBefore / 1024).toFixed(0).padStart(5)} KB -> ` +
      `${replaced ? (sizeAfter / 1024).toFixed(0).padStart(5) + ' KB' : '  zaključan'}  |  webp ${(sizeWebp / 1024).toFixed(0).padStart(5)} KB`
  );
}

const files = await walk(PUBLIC);
await mkdir(PUBLIC, { recursive: true });
for (const f of files) await processFile(f);

// --- Generiši listu WebP fajlova za front-end (da browser ne dobija 404) ---
const allAfter = await walk(PUBLIC);
const webpList = allAfter
  .filter((f) => f.endsWith('.webp'))
  .map((f) => '/' + relative(PUBLIC, f).split('\\').join('/'))
  .sort();

const listFile = join(ROOT, 'src', 'data', 'webpAssets.ts');
const { writeFile } = await import('node:fs/promises');
await writeFile(
  listFile,
  `// AUTO-GENERISANO — ne ručno editovati. Pokreni: npm run optimize-images\n` +
    `// Spisak WebP fajlova u public/ folderu (koristi ih lib/image.ts).\n` +
    `export const WEBP_ASSETS = new Set<string>([\n` +
    webpList.map((p) => `  '${p}',`).join('\n') +
    `\n]);\n`,
  'utf8'
);
console.log(`\nGenerisano: ${listFile} (${webpList.length} stavki)`);

console.log('\n---');
console.log(`Ukupno pre:  ${(before / 1024 / 1024).toFixed(2)} MB`);
console.log(`Ukupno posle (JPG/PNG): ${(after / 1024 / 1024).toFixed(2)} MB  (${((1 - after / before) * 100).toFixed(0)}% manje)`);
console.log(`WebP ukupno: ${(webpMade / 1024 / 1024).toFixed(2)} MB`);
