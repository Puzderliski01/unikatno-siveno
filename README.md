# Unikatno šiveno – Jelena Erić

**Luksuzni modni atelje** — unikatna ženska odeća po meri, prirodni plemeniti materijali i ručna izrada u Beogradu.

## O projektu

Ovo je sajt za atelje "Unikatno šiveno – Jelena Erić" — luksuzni modni atelje specijalizovan za izradu visokokvalitetne ženske odeće po meri. Sajt je izrađen kao moderne, elegante e-commerce platforme sa fokusom na vizuelnu estetiku i korisničko iskustvo.

### Ključne karakteristike

- **Katalog proizvoda** — 15+ unikatnih modela (haljine, blejzeri, bluze, suknje, majice, aksesoari)
- **Detaljni pregledi proizvoda** — sa slikama, karakteristikama, materijalima, négama i mogućnošću prilagođavanja
- **Korpa i checkout** — pun funkcionalan proces kupovine (samo Srbija)
- **Lista želja** — čuvanje omiljenih artikala za kasniju kupovinu
- **Rezervacija merenja** — booking sistem za dolazak u atelje (Topola/Beograd)
- **Image Lightbox** — zoom visokorezolucijskih slika
- **O ateljeu** — sekcija o filozofiji, rukotvorini i "slow fashion" pristupu
- **Kontakt i FAQ** — informacije o ateljeu, dostavi, vraćanju i prilagođavanju

### Tehnologije

- **React 19** + **TypeScript**
- **Vite** — brzi dev server i build
- **Tailwind CSS v4** — utility-first stilovi
- **Motion (Framer Motion)** — animacije i tranzicije
- **Lucide React** — ikonice
- **Google Generative AI** — za buduće AI funkcionalnosti

## Pokretanje lokalno

### Preduslovi

- Node.js 18+
- npm ili pnpm

### Instalacija

```bash
# Kloniraj repozitorijum
git clone <repo-url>
cd unikatno-siveno-jelena-eric

# Instaliraj zavisnosti
npm install

# Pokreni development server
npm run dev
```

Sajt će biti dostupan na `http://localhost:3000`

### Build za produkciju

```bash
npm run build
```

Izlaz je u `dist/` folderu, spreman za deploy na Vercel, Netlify ili bilo koji static hosting.

### Lint / Typecheck

```bash
npm run lint
```

## Struktura projekta

```
src/
├── components/          # React komponenti
│   ├── Header.tsx       # Navigacija, korpa, wishlist, booking dugmad
│   ├── Hero.tsx         # Hero sekcija sa CTA
│   ├── ProductGrid.tsx  # Mreža proizvoda sa filterima
│   ├── ProductCard.tsx  # Karta proizvoda u gridu
│   ├── ProductDetailModal.tsx  # Detaljni modal proizvoda
│   ├── CartDrawer.tsx   # Bočna korpa (slide-in)
│   ├── CheckoutModal.tsx# Checkout modal
│   ├── WishlistModal.tsx# Modal liste želja
│   ├── FittingBookingModal.tsx # Booking merenja
│   ├── ImageLightbox.tsx# Zoom slika
│   ├── AboutSection.tsx # O ateljeu
│   ├── ContactSection.tsx # Kontakt, FAQ, mapa
│   ├── Footer.tsx       # Footer sa newsletterom
│   └── Toast.tsx        # Notifikacije
├── data/
│   └── products.ts      # Podaci o proizvodima (15+ artikala)
├── types.ts             # TypeScript interfejsi
├── App.tsx              # Glavna komponenta sa stanjem
├── main.tsx             # Entry point
└── index.css            # Globalni stilovi + Tailwind
```

## Kategorije proizvoda

| Kategorija | Label | Broj proizvoda |
|------------|-------|----------------|
| `haljine` | Večernje haljine / Letnje haljine / Haljine po meri | 7 |
| `blejzeri` | Blejzeri & Kaputi / Pantalone & Odelo / Kaputi po meri | 3 |
| `svila` | Svila & Bluze / Korseti & Topovi | 2 |
| `suknje` | Suknje | 1 |
| `majice` | Majice | 2 |
| `aksesoari` | Aksesoari | 1 |

## Funkcionalnosti u detalju

### Korpa (CartDrawer)
- Dodavanje/uklanjanje artikala
- Promena količine
- Prikaz ukupne cene u RSD
- Prelazak na checkout

### Checkout (CheckoutModal)
- Forma za dostavu (ime, telefon, email, adresa, grad)
- Način plaćanja: **gotovina prilikom preuzimanja** (samo Srbija)
- Napomena za porudžbinu
- Generisanje ID porudžbine

### Lista želja (WishlistModal)
- Dodavanje/uklanjanje sa srcem na karti proizvoda
- Premestanje u korpu
- Otvaranje detalja proizvoda

### Booking merenja (FittingBookingModal)
- Izbor lokacije: Atelje Topola / Beograd (dogovor)
- Datum i vreme termina
- Opciono: preselektovan proizvod za prilagođavanje
- Validacija forme

### Detalji proizvoda (ProductDetailModal)
- Galerija slika sa zoomom
- Kompletan opis, priča, karakteristike
- Materijali i nega
- Izbor veličine (uključujući "Izrada po ličnim merama")
- Dugme za dodavanje u korpu / rezervaciju merenja / wishlist

## Konfiguracija

### Environment varijable

Kopiraj `.env.example` u `.env.local` i popuni:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Napomena:** Trenutno AI funkcionalnosti nisu implementirane u UI, API ključ je rezerisan za buduće proširenje (npr. AI stilist, generisanje opisa).

## Deploy

### Vercel (preporučeno)
1. Push na GitHub
2. Uvezi projekat u Vercel
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
Isti postupak, build command `npm run build`, publish directory `dist`.

### Static hosting (Nginx, Apache, S3+CloudFront)
Sadržaj `dist/` foldera je čisto static — radi na bilo kom web serveru.

## Licenca

Privatni projekat — sve rights reserved. Korišćenje koda, dizajna, slika ili teksta bez dozvole nije dozvoljeno.

---

**Atelje Jelena Erić** — Topola / Beograd, Srbija  
*Unikatno šiveno, unikatno vi.*