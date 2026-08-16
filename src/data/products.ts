import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'collage-t-shirt',
    nameSr: 'Majica "Collage"',
    subtitleSr: 'Lagana, providna majica za savršen morski look',
    category: 'majice',
    categoryLabelSr: 'Majice',
    priceRSD: 8500,
    badge: 'Novo',
    descriptionSr: 'Lagano, providno i chic, majica "Collage" za savršen morski look.',
    storySr: 'Inspirisana mediteranskim letom i laganim povetarcem, majica "Collage" je stvorena za žene koje uživaju u opuštenoj eleganciji.',
    features: [
      'Lagana, prozračna tkanina prijatna na koži',
      'Chic dizajn idealan za letnje kombinacije',
      'Savršena za morski look i opuštene dane',
      'Može se nositi samostalno ili slojevito'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    images: [
      '/majice/collage/collage1.jpg',
      '/majice/collage/collage2.jpg',
      '/majice/collage/collage3.jpg'
    ],
    isCustomizable: false,
    leadTimeDays: '2–3 radna dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'larisa-dress',
    nameSr: 'Haljina "Larisa"',
    subtitleSr: '"Leto u boji mora"',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 29000,
    badge: 'Novo',
    descriptionSr: 'Leto u boji mora. Haljina "Larisa" ističe vašu preplanulost i čini da izgledate zanosno bez napora.',
    storySr: 'Inspirisana bojama Jadranskog mora i letnjim zalascima sunca, haljina "Larisa" je stvorena za žene koje žele da zablistaju bez napora.',
    features: [
      'Lagana, lepršava tkanina prijatna na koži',
      'Boja koja ističe preplanulost',
      'Zanosan izgled bez napora',
      'Idealna za letnje večeri i posebne prilike'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/haljine/larisa/larisa1.jpg',
      '/haljine/larisa/larisa2.jpg',
      '/haljine/larisa/larisa3.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '4–6 radnih dana',
    modelInfo: 'Model je visoka 178 cm i nosi veličinu S (36)'
  },
  {
    id: 'joli-suki-skirt',
    nameSr: 'Suknja "Joli Suki"',
    subtitleSr: 'Minimalistička suknja sa jednom nogavicom',
    category: 'suknje',
    categoryLabelSr: 'Suknje',
    priceRSD: 18500,
    badge: 'Novo',
    descriptionSr: '"Joli Suki" je minimalizam koji ne traži pažnju, ona je privlači. Suknja sa jednom nogavicom ne prati pravila, već ih postavlja.',
    storySr: 'Dizajnirana za žene koje ne prate trendove već ih kreiraju. "Joli Suki" ruši konvencije asimetričnom formom i čistim linijama.',
    features: [
      'Asimetričan kroj sa jednom nogavicom',
      'Minimalistički dizajn koji privlači pažnju',
      'Čiste linije i precizna izrada',
      'Savršena za kombinovanje sa različitim gornjim delovima'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/suknje/jolisuki/jolisuki1.jpg',
      '/suknje/jolisuki/jolisuki2.jpg',
      '/suknje/jolisuki/jolisuki3.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 176 cm i nosi veličinu S (36)'
  },
  {
    id: 'olivia-dress',
    nameSr: 'Haljina "Olivia"',
    subtitleSr: 'Klasična prugasta haljina za opušten letnji look',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 16500,
    badge: 'Novo',
    descriptionSr: 'Najudobnija haljina koju ćeš nositi ove sezone! Haljina "Olivia" je savršen spoj stila i udobnosti. Prugicie joj daju onaj klasičan letnji izgled, a kroj je super opušten!',
    storySr: 'Stvorena za dane kada želite da izgledate sjajno a osećate se još bolje. "Olivia" je haljina u kojoj ćete provoditi ceo dan — od jutarnje kafe do večernje šetnje.',
    features: [
      'Klasičan prugast dizajn za bezvremeni letnji look',
      'Super opušten kroj za maksimalnu udobnost',
      'Lagana tkanina prijatna na koži',
      'Idealna za svakodnevno nošenje i letnja putovanja'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/haljine/olivia/olivia1.jpg',
      '/haljine/olivia/olivia2.jpg',
      '/haljine/olivia/olivia3.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'jullyet-top',
    nameSr: 'Top "Jullyet"',
    subtitleSr: 'Bezrukavi top sa leopard dezenom i tilom',
    category: 'majice',
    categoryLabelSr: 'Majice',
    priceRSD: 12500,
    badge: 'Novo',
    descriptionSr: 'Tražite savršenu kombinaciju odvažnog i elegantnog? Top "Jullyet" bez rukava donosi atraktivan sivo crni leopard dezen kombinovan sa sofisticiranim crnim tilom na bočnim stranama koji stvara lagan i lepršav efekat.',
    storySr: 'Kombinacija divljeg leopard printa i nežnog tila — "Jullyet" je za žene koje ne boje da budu primećene.',
    features: [
      'Atraktivan sivo-crni leopard dezen',
      'Sofisticirani crni til na bočnim stranama',
      'Lagan i lepršav efekat',
      'Bezrukavi kroj za letnje dane'
    ],
    materialsAndCare: {
      composition: 'Mešavina prirodnih vlakana, til: 100% poliester',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    images: [
      '/majice/jullyet/jullyet1.jpg',
      '/majice/jullyet/jullyet2.jpg',
      '/majice/jullyet/jullyet3.jpg'
    ],
    isCustomizable: false,
    leadTimeDays: '2–3 radna dana',
    modelInfo: 'Model je visoka 176 cm i nosi veličinu S (36)'
  },
  {
    id: 'rahela-dress',
    nameSr: 'Haljina "Rahela"',
    subtitleSr: 'Bezvremenska elegancija u crno-belim tufnama',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 28000,
    badge: 'Novo',
    descriptionSr: 'Obuci "Rahela" haljinu na koktel, večeru ili letnju zabavu i budi zvezda večeri. Crno-bela tkanina sa tufnama kreira sofisticiran i bezvremenski look koji nikad ne izlazi iz mode.',
    storySr: 'Inspirisana klasičnim filmskim herojinama i bezvremenom elegancijom, "Rahela" je stvorena za žene koje žele da zablistaju na svakoj prilici bez mnogo napora.',
    features: [
      'Crno-bela tkanina sa elegantnim tufnama',
      'Savršena za koktel, večeru i letnje zabave',
      'Bzvremenski kroj koji lepote svaku figuru',
      'Lagan i udoban materijal za ceodnevno nošenje'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/haljine/rahela/rahela1.jpg',
      '/haljine/rahela/rahela2.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'letnja-lanena-haljina',
    nameSr: 'Letnja lanena haljina "Mare"',
    subtitleSr: 'Spremna za sunce uz more',
    category: 'haljine',
    categoryLabelSr: 'Letnje haljine',
    priceRSD: 22000,
    badge: 'Novo',
    descriptionSr: 'Savršena letnja haljina (100% lan, 100% unikat), idealna za lagane letnje šetnje. Dodajte samo pletenu torbu i omiljene sandale i spremne ste za sunčan letnji dan.',
    storySr: 'Inspirisana mediteranskim letnjim danima i povetarcem uz obalu. "Mare" je stvorena za žene koje cene prirodne materijale i bezrežimski komfor.',
    features: [
      '100% prirodan lan - dišuća i hladna tkanina',
      'Jedinstven unikat - svaka haljina je zaista posebna',
      'Opušten kroj za maksimalnu slobodu pokreta',
      'Idealna za plažu, grad i putovanja'
    ],
    materialsAndCare: {
      composition: '100% Prirodan lan',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja dok je vlažno',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/haljine/letnja01/letnja1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'crvena-asimetricna-haljina',
    nameSr: 'Crvena asimetrična haljina "Passione"',
    subtitleSr: 'Crvena nije samo boja, to je energija, strast i samopouzdanje',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 31000,
    badge: 'Novo',
    descriptionSr: 'Crvena nije samo boja, to je energija, strast i samopouzdanje koje nosite. Osetite tu moć u ovoj spektakularnoj asimetričnoj haljini, gde je svaki šav priča za sebe.',
    storySr: 'Dizajnirana za žene koje ne boje da budu u centru pažnje. "Passione" spaja odvažan asimetričan kroj sa senzualnošću crvene boje, kreirajući haljinu koja govori pre nego što vi progovorite.',
    features: [
      'Spektakularan asimetričan kroj',
      'Intenzivna crvena boja za maksimalan uticaj',
      'Svaki šav pažljivo odrađen ručno',
      'Idealna za večerne izlazke i posebne prilike'
    ],
    materialsAndCare: {
      composition: '100% Prirodna tkanina',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Pranje u mašini na 30°C',
        'Peglati sa naličja',
        'Ne sušiti u mašini'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      '/haljine/crvena01/crvena1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  }
];

export const FORMAT_RSD = (amount: number): string => {
  return new Intl.NumberFormat('sr-RS').format(amount) + ' RSD';
};
