# Unikatno šiveno – Jelena Erić

**Luksuzni modni atelje** — unikatna ženska odeća po meri, prirodni plemeniti materijali i ručna izrada u Topoli.

## O projektu

Ovo je sajt-atelier za "Unikatno šiveno – Jelena Erić" — galerija svega što brend ima i na stanju, sa cenama i svim detaljima modela. Sajt **nije online prodavnica**: nema plaćanja ni porudžbine preko sajta. Poručivanje se dogovara direktno, preko WhatsApp-a ili Instagram DM-a.

> **Važno:** sajt ne vrši prodaju niti naplatu. Dugme "Izbor" služi da kupac sklopi listu željenih modela i pošalje je vlasnici porukom, gde se dogovaraju oko svega.

### Ključne karakteristike

- **Katalog modela** — 15+ unikatnih modela (haljine, blejzeri, bluze, suknje, majice, aksesoari) sa vidljivim cenama u RSD
- **Izbor (bivša korpa)** — sklapanje liste željenih modela, pa "Pošalji izbor na WhatsApp" (wa.me sa gotovom porukom) ili "Kopiraj za Instagram DM"
- **Detaljni pregledi modela** — slike, karakteristike, materijali, nega, poručivanje dogovorom
- **Lista želja i Outfit Builder** — čuvanje omiljenih modela i slaganje kompletnih autfita
- **Nalozi, newsletter, VIP klub i personalizacija** — preko Supabase-a
- **Blog, gift-registry banner, zvono za obaveštenja**
- **Image Lightbox** — zoom visokorezolucijskih slika
- **Politika privatnosti** — zasebna stranica (`/politika-privatnosti`)
- **Admin panel** — `/admin`, prijava preko Supabase auth, sadržaj se uređuje preko Supabase-a

### Kontakt

- **WhatsApp / telefon:** +381 636 160 71 → `https://wa.me/38163616071`
- **Instagram:** [@jelena.ericc](https://www.instagram.com/jelena.ericc/) (DM: `https://ig.me/m/jelena.ericc`)
- **Facebook:** [Unikatno šiveno – Jelena Erić](https://www.facebook.com/people/Unikatno-%C5%A1iveno-Jelena-Eri%C4%87/100063482086585/)
- **Email:** jelena.ericc@gmail.com
- **Posete ateljeu:** isključivo po najavi i dogovoru — Topola (rad po dogovoru)

### Tehnologije

- **React 19** + **TypeScript**
- **Vite** — brzi dev server i build
- **Tailwind CSS v4** — utility-first stilovi
- **Motion (Framer Motion)** — animacije i tranzicije
- **Lucide React** — ikonice
- **Supabase** — autentikacija, proizvodi, newsletter, obaveštenja

## Pokretanje lokalno

### Preduslovi

- Node.js 18+
- npm

### Instalacija

```bash
npm install

# Development server
npm run dev
```

### Build za produkciju

```bash
npm run build
```

Izlaz je u `dist/` folderu, spreman za Vercel.

### Lint / Typecheck

```bash
npm run lint
```

## Konfiguracija (Supabase)

Ključevi su u `.env` (gitignored):

```env
VITE_SUPABASE_URL=https://<tvoj-projekt>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon ključ>
```

**Sajt radi i bez njih** — u tom slučaju se koriste ugrađeni podaci i funkcionalnosti koje zavise od Supabase-a (newsletter, admin, nalozi) prijavljuju grešku na lep način.

### Obavezno: tabela za newsletter

U Supabase SQL Editor-u pokreni sadržaj fajla **`supabase-subscribers.sql`** — kreira tabelu `subscribers` i RLS pravila. Bez toga prijava na bilten neće upisivati podatke.

### Vercel

Na Vercelu moraju biti podešene iste env varijable (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Build command: `npm run build`, output: `dist`. Fajl `vercel.json` obezbeđuje da rute `/politika-privatnosti` i `/admin` rade direktnim otvaranjem.

## Struktura projekta

```
src/
├── components/
│   ├── Header.tsx            # Navigacija, Izbor, wishlist, nalog
│   ├── Hero.tsx              # Hero sekcija
│   ├── ProductGrid.tsx       # Mreža modela sa filterima i sortiranjem
│   ├── ProductCard.tsx       # Kartica modela ("U izbor")
│   ├── ProductDetailModal.tsx# Detalji modela + "Dodaj u izbor"
│   ├── CartDrawer.tsx        # "Izbor" — WhatsApp / Instagram poruka
│   ├── WishlistModal.tsx     # Lista želja
│   ├── OutfitBuilder.tsx     # Slaganje autfita
│   ├── ContactSection.tsx    # Kontakt (WhatsApp/Instagram), FAQ, mapa
│   ├── Footer.tsx            # Footer + newsletter (Supabase)
│   ├── PrivacyPolicy.tsx     # Politika privatnosti
│   ├── FloatingActionBar.tsx # WhatsApp / Instagram / tema
│   └── Toast.tsx             # Notifikacije
├── admin/                    # Admin panel (Supabase auth)
├── data/                     # Ugrađeni podaci o modelima (fallback)
├── lib/supabase.ts           # Klijent + subscribeToNewsletter
├── types.ts                  # TypeScript interfejsi
├── App.tsx                   # Glavna komponenta, rute
└── index.css                 # Globalni stilovi + Tailwind
```

## Deploy

1. Push na GitHub (`main` grana) — Vercel ga automatski deploy-uje
2. Na Vercelu podesi `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY`
3. U Supabase-u pokreni `supabase-subscribers.sql`

Postojeći URL: `unikatno-siveno.vercel.app`

## Licenca

Privatni projekat — all rights reserved. Korišćenje koda, dizajna, slika ili teksta bez dozvole nije dozvoljeno.

---

**Atelje Jelena Erić** — Topola, Srbija
*Unikatno šiveno, unikatno vi.*
