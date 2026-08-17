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
    categoryLabelSr: 'Letnje haljine',
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
    categoryLabelSr: 'Letnje haljine',
    priceRSD: 16500,
    badge: 'LIMITED EDITION',
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
      '/haljine/olivia/olivia1.jpg'
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
      '/majice/jullyet/jullyet1.jpg'
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
    categoryLabelSr: 'Letnje haljine',
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
  },
  {
    id: 'zozelin-dress',
    nameSr: 'Haljina "Žozefin"',
    subtitleSr: 'Balans između prefinjenosti i modernog dizajna',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 27000,
    badge: 'Novo',
    descriptionSr: 'Haljina "Žozefin" deluje kao savršen izbor za prilike gde se traži balans između prefinjenosti i modernog dizajna.',
    storySr: 'Inspiracija za "Žozefin" dolazi iz želje da se spoji klasika sa modernim detaljima. Ova haljina je za žene koje cene eleganciju ali ne žele da žrtvuju svoj jedinstveni stil.',
    features: [
      'Prefinjen dizajn sa modernim detaljima',
      'Balans klase i savremenog stila',
      'Izrađena od kvalitetnih prirodnih materijala',
      'Idealna za posebne prilike i svečane događaje'
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
      '/haljine/zozelin/zozelin1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'unikatna-dress',
    nameSr: 'Unikatna haljina',
    subtitleSr: 'Asimetrični kroj i prefinjena silueta u boji peska',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 32000,
    badge: 'UNIKAT',
    descriptionSr: 'Ova unikatna haljina u boji peska, spaja asimetrični kroj i prefinjenu siluetu, čineći je idealnim izborom za svaku priliku gde želite da ostavite utisak bez mnogo truda.',
    storySr: 'Svaka unikatna haljina priča svoju priču. "Pesak" je inspirisan prirodnim tonovima i asimetričnim formama koje ističu žensku senzualnost na sofisticiran način.',
    features: [
      'Jedinstven unikat - samo jedan komad',
      'Asimetrični kroj koji ističe siluetu',
      'Elegantna boja peska',
      'Prefinjena izrada sa pažnjom na detalje'
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
    sizes: ['Izrada po ličnim merama'],
    images: [
      '/haljine/unikatna/unikatna1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '5–7 radnih dana',
    modelInfo: 'Model je visoka 176 cm i nosi veličinu S (36)'
  },
  {
    id: 'crna-asimetricna',
    nameSr: 'Crna asimetrična haljina',
    subtitleSr: 'Više od haljine - to je tvoja supermoć',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 29500,
    badge: 'LIMITED',
    descriptionSr: 'Više od haljine! To je tvoja supermoć. Ovaj asimetrični kroj nije za stidljive. To je komad za ženu koja zna šta želi i ne plaši se da to pokaže.',
    storySr: 'Za ženu koja se usuđuje da bude drugačija. Crna asimetrična haljina je više od odeće - to je izjava. Komad koji govori vašim jezikom pre nego što vi progovorite.',
    features: [
      'Odvažan asimetrični kroj',
      'Intenzivna crna boja',
      'Za ženu koja zna šta želi',
      'Komad koji ostavlja utisak'
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
      '/haljine/crna/crna1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'linda-dress',
    nameSr: 'Haljina "Linda"',
    subtitleSr: 'Burgundi asimetrična kreacija',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 31000,
    badge: 'Novo',
    descriptionSr: 'Haljina koja govori pre nego što progovorite. Otkrijte lepotu asimetrije u burgundi kreaciji. Izrađena s ljubavlju i pažnjom prema svakom detalju.',
    storySr: '"Linda" je više od odeće, to je izjava o stilu. Inspiracija dolazi iz želje da se spoji toplina burgundi boje sa modernim asimetričnim krojem koji ostavlja bez daha.',
    features: [
      'Elegantna burgundi boja',
      'Asimetrični kroj za dramatičan efekat',
      'Izrađena s ljubavlju i pažnjom prema svakom detalju',
      'Izjava o stilu'
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
      '/haljine/linda/linda1.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '4–6 radnih dana',
    modelInfo: 'Model je visoka 177 cm i nosi veličinu S (36)'
  },
  {
    id: 'gaby-jacket',
    nameSr: 'Jakna "Gaby"',
    subtitleSr: 'Teal-plava jakna od italijanske kože',
    category: 'blejzeri',
    categoryLabelSr: 'Blejzeri i jakne',
    priceRSD: 45000,
    badge: 'Premium',
    descriptionSr: 'Teal-plava jakna "Gaby" od italijanske kože (poznate po mekoći, dugovečnosti i luksuznom sjaju), prilagođava se telu i vremenom postaje sve lepša.',
    storySr: 'To je komad koji ne samo da gradi stil, već i priču o kvalitetu, trajnosti i sofisticiranom ukusu. Italijanska koža je poznata po svojoj mekoći i dugovečnosti, a jakna "Gaby" to potvrđuje.',
    features: [
      'Italijanska koža vrhunskog kvaliteta',
      'Teal-plava boja za sofisticiran izgled',
      'Prilagođava se telu vremenom',
      'Komad koji traje ceo život'
    ],
    materialsAndCare: {
      composition: '100% Italijanska koža',
      origin: 'Ručno šiveno u Ateljeu Jelena Erić, Topola',
      care: [
        'Čistiti kod stručnog kozmetičara za kožu',
        'Redovno tretirati sredstvom za kožu',
        'Čuvati na suvom mestu'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    images: [
      '/blejzeri/gaby/gaby1.jpg'
    ],
    isCustomizable: false,
    leadTimeDays: '7–10 radnih dana',
    modelInfo: 'Model je visoka 176 cm i nosi veličinu S (36)'
  },
  {
    id: 'atina-tunika',
    nameSr: 'Tunika "Atina"',
    subtitleSr: 'Nežnost i snaga u asimetričnom kroju',
    category: 'haljine',
    categoryLabelSr: 'Tunike',
    priceRSD: 24000,
    badge: 'Novo',
    descriptionSr: 'Tunika "Atina" ukazuje na nežnost i snagu istovremeno. Asimetrični kroj i nabori pretvaraju je u umetnost. Ne pripada serijskoj, brzoj proizvodnji.',
    storySr: 'Ona je plod mog ručnog rada, strpljenja i emocije, namenjena svima koji vole unikatno šivenu odeću. "Atina" je inspirisana grčkom lepotom i snagom žene.',
    features: [
      'Asimetrični kroj sa elegantnim naborima',
      'Nežnost i snaga u jednom komadu',
      'Ručni rad sa puno pažnje',
      'Unikatna izrada'
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
      '/haljine/atina/atina1.jpg',
      '/haljine/atina/atina2.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '4–6 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'kaliope-dress',
    nameSr: 'Pačvork haljina "Kaliope"',
    subtitleSr: 'Boje i geometrija u jednu priču',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 35000,
    badge: 'UNIKAT',
    descriptionSr: '"Kaliope" pačvork haljina spaja boje i geometriju u jednu priču. Asimetrični kroj i smeli kontrasti, pretvaraju je u modni manifest.',
    storySr: 'Ona je hrabra, umetnička i neponovljiva. Ona je jedna i jedina. "Kaliope" je inspirisana umetnošću pačvorka i željom da se stvori komad koji je istovremeno nosiv i umetnički.',
    features: [
      'Jedinstven pačvork dizajn',
      'Smeli kontrasti i geometrijski oblici',
      'Asimetrični kroj za moderan izgled',
      'Hrabra i umetnička kreacija'
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
      '/haljine/kaliope/kaliope1.jpg',
      '/haljine/kaliope/kaliope2.jpg',
      '/haljine/kaliope/kaliope3.jpg',
      '/haljine/kaliope/kaliope4.jpg'
    ],
    isCustomizable: true,
    leadTimeDays: '5–7 radnih dana',
    modelInfo: 'Model je visoka 178 cm i nosi veličinu S (36)'
  }
];

export const FORMAT_RSD = (amount: number): string => {
  return new Intl.NumberFormat('sr-RS').format(amount) + ' RSD';
};
