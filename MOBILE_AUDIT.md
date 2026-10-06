# Mobilni QA izveštaj (390 px / 360 px)

Metod: sajt se učitava u iframe širine 390×844 (pa 360×780) unutar browsera; merenja preko DOM-a
(`getBoundingClientRect`, `scrollWidth`, izračunati fontovi). Emulacija dodira/hover ne postoji —
stvari koje zavise od dodira (pinch zoom, hover stanja, tekst uputa u lightboxu) proveravaju se čitanjem koda.
Rad je organizovan u talasima: **analiza → ispravka → provera**.

---

## 1. Rezultat pre/posle

| Metrika (početna strana) | Pre | Posle 390 px | Posle 360 px |
|---|---|---|---|
| Horizontalni skrol (`scrollWidth` vs `innerWidth`) | 0 (čisto) | **0** | **0** |
| Tekst ispod 11 px (čitljiv sadržaj) | **72** | **0** | **0** |
| Ciljevi ispod 40 px (A/B/INPUT/SELECT) | **22** | **3** \* | **3** \* |
| Preklapanja sadržaja van kontejnera | 0 | **0** | **0** |
| Visina gornje trake | 107 px | **94 px** | 94 px |
| Donja navigacija: stavka / ikona / oznaka | 32 px / 16 px / 9 px | **48 px / 20 px / 11 px** | isto |
| Modala detalja: skrol kontejnera | **2** (ugnježden) | **1** | **1** |
| Modala detalja (panel) | dijalog sa 40 px marginom | **390×844 preko celog ekrana** | 360×780 |

\* Preostala 3 nalaza su dozvoljeni izuzeci i namerno nisu dirana:
`INPUT 20×20` čekboks unutar 44 px visine linka-kontejnera, `jelena.ericc@gmail.com 126×26` i
`politici privatnosti 91×25` — **unutrašnje (inline) veze u rečenici**, koje WCAG 2.5.8 izričito izuzima.

Za svaki cilj važi merilo **≥ 44 px** (Apple/Materijal), odnosno WCAG 2.5.8 AA ≥ 24 px — nijedan element
više ne pada ispod 24 px.

---

## 2. Nalazi iz prvog talasa (H1–H7) i kako su rešeni

### H1 — Tipografija premala ✅
- **72 teksta na 10 px** (podnaslov logotipa, oznake donje navigacije, natpisi sekcija, footer linkovi).
- Sve u `src/components/*.tsx` podignuto na **11 px minimum** (54 zamene), a duži opisi teksta
  (podnaslovi kartica, hero opisi, opisi „Skoro gledano") na **12 px**.
- Rezultat: **0 tekstova ispod 11 px** na 390 i 360 px.

### H2 — Tap ciljevi ispod standarda ✅
- Footer: linkovi 16 px → **44 px redovi**, kontakt redovi 44 px, dugmad za mreže 44×44,
  „Prijavite se" 39 px → **48 px**.
- Katalog: search 34 → **44 px**, select 35 → **44 px**, čekboks 14 → **20 px** (+ 44 px label),
  number input 31 → **44 px**, prekidači prikaza 44×44.
- Modala detalja: X 36 → **44 px**, srce 34 → **44 px**, „Outfit" 39 → **44×44** (uz `aria-label`),
  tabovi 24 → **43–44 px**, „Tabela veličina" i „Budite prvi da komentarišete…" 16/32 → **44 px**,
  strelice galerije, tačkice 36 px (≥ 24 AA).
- Recenzije: **zvezdice 30 → 44 px**, polja forme 38 → **47 px**, „Pošalji komentar" → **48 px**.
- Preklapanja: Auth (close, polja 44 px, dugme 48 px, link „Registrujte se"), Cart (CTA 44/48),
  Wishlist (prazno stanje → **48 px**), VIP (0 ciljeva ispod 40 px), OutfitBuilder (FAB i CTA 44/48),
  Lightbox (− % + i X → **44 px**), sekcija kontakta (telefon, mejl, WhatsApp, Instagram → 44 px),
  „Ostavi utisak", „Nazad na sajt" na stranici privatnosti.
- Prekidač oka za lozinku i „close" u AuthModal-u → 44×44.

### H3 — „Dva skrol menija" u detaljima modela ✅ (kompletno izmišljen modal)
- **Uklonjen ugnježdeni skrol** desne kolone — postoji tačno **jedan** skrol kontejner (`overscroll-contain`).
- Na telefonu je modal **preko celog ekrana (390×844)**, bez paddinga i zaobljenih ivica.
- Sakriven breadcrumb ispod 640 px (JS provera + CSS media pravilo, jer neuslovljeni CSS u `index.css`
  pobeđuje Tailwind `hidden`).
- **Lepljiva traka tabova** sa `.scroll-fade-x` naznakom da ih treba pomerati.
- **Trajna donja traka na telefonu**: cena + „Dodaj u izbor" (CTA je izbačen iz toka sadržaja na telefonu).
- Tačkice galerije, uvek vidljiv natpis „Uvećaj", oznaka „Model nosi M (38)".
- Prazan podatak ne pravi rupu: bez veličina → poruka „Veličinu i kroj dogovaramo lično…";
  bez opisa/priče/karakteristika → poruka umesto praznih okvira (podaci iz Supabase-a mogu biti nepotpuni).

### H4 — Lightbox: tekst za miša na telefonu ✅
- Uslovljeno preko `matchMedia('(hover: none), (pointer: coarse)')`:
  telefon → „ŠIRITE PRSTIMA ZA UVEĆANJE…", desktop → postojeći tekst.

### H5 — Fiksne trake ✅
- Gornja traka 107 → **94 px**, donja 62 px + `safe-area` padding, stavke 48 px.

### H6 — Sakriveni skrolbar bez naznake ✅
- Nova CSS utilija `.scroll-fade-x` (gradijentna maska na ivicama) na: čipovima kategorija,
  „Skoro gledano", trakama tabova (profil, modala). Na ≥1024 px se isključuje.

### H7 — Ostalo ✅ / napomene
- Cart drawer: 344 → **350 px** širine (levo 40 px traka za zatvaranje), **0 ciljeva ispod 40 px**.
- Skrol do sekcija: novi `src/lib/scroll.ts` meri stvarnu visinu vidljivog gornjeg traka
  (`getHeaderOffset`) — naslov sekcije više ne završava ispod lepljive trake (ranije fiksni 80/100 px,
  a footer je koristio `scrollIntoView` bez pomaka).
- **Zaključavanje skrola pozadine**: novi hook `src/hooks/useBodyScrollLock.ts` primenjen na
  Cart, Wishlist, Auth, Profil, VIP i OutfitBuilder (ranije je pozadina nesmetano skrolovala iza panela).

---

## 3. Provera po slojevima (posle ispravki)

| Površina | 390 px | 360 px |
|---|---|---|
| Početna strana | 0 prelivanja, 0 sitnog teksta, 3 dozvoljena izuzeta | isto |
| Modala detalja | panel 390×844, **1** skrol kontejner (704/1028), donja traka 70 px, 2 cilja ispod 40 px (tačkice 35 px ≥ 24 AA) | panel preko celog ekrana, 1 skrol, traka 70 px |
| Katalog (kolekcija) | pretraga 44, select 44, čipovi sa maskom, 2 kolone po 168 px | 2 kolone, bez prelivanja |
| Korpa | panel 350×844, **0** ciljeva ispod 40 px, `overflow: hidden` | — |
| Prijava | polja 293×44, **0** ciljeva ispod 40 px, zaključan skrol | — |
| Lista želja | **0** ciljeva ispod 40 px, zaključan skrol | — |
| VIP pogodnosti | panel 390×844, **0** ciljeva ispod 40 px | — |
| Lightbox | 390×844, **0** ciljeva ispod 40 px, slika 358×479 | — |
| Stranica privatnosti | **0** sitnog teksta, prethodno 1 — „Nazad na sajt" 32 → 44 px | isto |
| Desktop (1280 px) | modala: 1024×720, 2 kolone 468+468, **1** skrol kontejner, traka sakrivena, breadcrumb vraćen | — |

Zaključak: donji deo modala na telefonu stalno prikazuje cenu i akciju, a sadržaj (opis, materijali,
veličine, poručivanje, recenzije sa formom) ide u **jednom** skrolu ispod toga.

---

## 4. Napomene za vlasnika

1. `product_reviews` tablicu treba napraviti u Supabase-u (SQL iz `supabase-reviews.sql`);
   do tada se komentari čuvaju lokalno i čekaju odobrenje.
2. Test proizvod **„Np" (9.990 RSD)** je u Supabase-u (ne u `src/data`) — obrisati ga ili preimenovati.
   Njegovi prazni podaci iskorišćeni su da proverim da modal lepo pada na prazan sadržaj.
3. Blog: nema objavljenih postova pa se `/blog/<slug>` ne može isprobati.
4. Admin panel je van obuhvata (nema Supabase ključeva u repozitorijumu).
5. Hover/pinch ponašanja (sočivo 2,4×, zoom točkićem) proveravaju se čitanjem koda — emulacija dodira
   ne postoji u test okruženju.

---
*Završeno: `npm run lint` (tsc) i `npm run build` (vite) prolaze posle svake izmene.*
