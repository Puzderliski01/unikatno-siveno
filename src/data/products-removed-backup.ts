import { Product } from '../types';

// Backup artikala koji koriste Unsplash slike (eksterne URL-ove)
// Ovi artikli su uklonjeni iz glavnog products.ts fajla
// Mogu se vratiti kada se zamene lokalnim slikama iz /public foldera

export const REMOVED_PRODUCTS: Product[] = [
  {
    id: 'elegant-black-evening-dress',
    nameSr: 'Elegantna crna večernja haljina "Nocturne"',
    subtitleSr: 'Ručno krojena večernja toaleta od teškog svilenog satena i francuskog tila',
    category: 'haljine',
    categoryLabelSr: 'Večernje haljine',
    priceRSD: 48500,
    originalPriceRSD: 54000,
    badge: 'Atelier Signature',
    descriptionSr: 'Haljina "Nocturne" predstavlja esenciju večernjeg glamura i preciznog zanatstva. Krojena od dvostrukog italijanskog svilenog satena sa diskretnim prorezom i ručno modeliranim naborima na struku koji laskaju svakoj figuri.',
    storySr: 'Inspirisana arhitekturom beogradskog modernizma i noćnim svetlima Dunava, Jelena Erić je ovaj model razvijala kroz 18 iteracija šablona kako bi stvorila haljinu koja pruža osećaj skulpturalne lakoće i neprikosnovene elegancije.',
    features: [
      '100% dvostruki mulberry svileni saten (Como, Italija)',
      'Unutrašnji korset sa fleksibilnim spiralnim fišbajnima za savršenu podršku',
      'Skriveni YKK zupčasti rajsferšlus sa ručno opšivenim svilenim dugmićima',
      'Ručno porubljeni donji rub bez vidljivih spoljnih šavova',
      'Mogućnost prilagođavanja dubine dekoltea i dužine šlepa po želji'
    ],
    materialsAndCare: {
      composition: '100% Prirodna svila (Mulberry Silk), postava: 100% svileni habotai',
      origin: 'Tkano u fabrici Como, Italija; Šiveno ručno u Ateljeu Jelena Erić, Topola',
      care: [
        'Isključivo specijalizovano hemijsko čišćenje za svilu',
        'Peglati sa naličja na najnižoj temperaturi (Silk postavka) uz upotrebu pamučne krpe',
        'Čuvati na postavljenom satenskom vešalici u zaštitnoj platnenoj navlaci ateljea'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '5–7 radnih dana za standardne veličine / 10–14 dana za šivenje po meri',
    modelInfo: 'Model je visoka 178 cm i nosi veličinu S (36)'
  },
  {
    id: 'classic-tailored-blazer',
    nameSr: 'Klasični strukirani blejzer od vune "Aura"',
    subtitleSr: 'Savršeno strukturisani sako od najfinije runske vune sa zlatnim dugmadima',
    category: 'blejzeri',
    categoryLabelSr: 'Blejzeri & Kaputi',
    priceRSD: 36000,
    originalPriceRSD: 39500,
    badge: 'Ručni rad',
    descriptionSr: 'Blejzer "Aura" kombinuje oštre linije savremenog krojenja sa tradicijom britanskog i italijanskog šivenja sakoa. Opremljen prirodnim konjskim platnom u reverima koje se vremenom prilagođava telu.',
    storySr: 'Krojenje muškog sakoa preneto u ženstvenu, moćnu siluetu. Svaki rever je pikiran ručno tradicionalnom iglom, obezbeđujući pad koji zadržava formu godinama.',
    features: [
      '100% devičanska vuna Super 130s (Biella, Italija)',
      'Ručno gravirana dugmad od punog livenog mesinga sa zlatnim finišem',
      'Polutradicionalno kanvasiranje (half-canvas) sa unutrašnjim ojačanjem od konjske dlake',
      'Dva prednja džepa sa preklopom i unutrašnji džep za telefon',
      'Svilenkasta viskozna postava u kontrastnoj boji šampanjca'
    ],
    materialsAndCare: {
      composition: 'Spoljašnjost: 100% Devičanska vuna Super 130s; Postava: 100% Cupro Bemberg',
      origin: 'Vuna iz regije Pijemont (Italija); Ručno krojeno u Topoli',
      care: [
        'Isključivo hemijsko čišćenje',
        'Preporučuje se provetravanje na vazduhu nakon nošenja',
        'Peglati parom sa odstojanja'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '4–6 radnih dana',
    modelInfo: 'Model je visoka 176 cm i nosi veličinu S (36)'
  },
  {
    id: 'minimalist-white-silk-blouse',
    nameSr: 'Minimalistička bela svilena bluza "Éthérée"',
    subtitleSr: 'Lepršava bluza od prirodne organske svile sa skrivenim kopčanjem i visokim manžetnama',
    category: 'svila',
    categoryLabelSr: 'Svila & Bluze',
    priceRSD: 22500,
    badge: '100% Prirodna svila',
    descriptionSr: 'Čista, fluidna forma stvorena da pruži osećaj apsolutne mekoće na koži. Bluza "Éthérée" poseduje produžene manžetne ukrašene bisernim dugmićima od rečnog bisera i opuštenu, fluidnu kragnu.',
    storySr: 'Stvorena kao temelj garderobera svake žene koja ceni suptilni luksuz. Bela svilena bluza u izvedbi Jelene Erić poseduje savršenu težinu (19 momme) koja nije providna a pruža tečni pad.',
    features: [
      '100% Prirodna Mulberry svila gustine 19 momme mat sjaja',
      'Prirodna dugmad od slatkovodnog bisera (Mother of Pearl)',
      'Francuski francuski zatvoreni šavovi (French seams) bez paranja',
      'Produžene manžetne sa duplim kopčanjem u stilu smoking košulje',
      'Mekana kragna koja se može nositi zakopčana ili ležerno otvorena'
    ],
    materialsAndCare: {
      composition: '100% Prirodna dudova svila (Mulberry silk)',
      origin: 'Organska sirova svila, ručno šivena u Ateljeu Jelena Erić',
      care: [
        'Ručno pranje u hladnoj vodi sa specijalnim tečnim deterdžentom za svilu',
        'Ne cediti uvrtanjem, sušiti položeno u peškiru u senci',
        'Peglati dok je tkanina blago vlažna sa naličja'
      ]
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '3–5 radnih dana',
    modelInfo: 'Model je visoka 175 cm i nosi veličinu S (36)'
  },
  {
    id: 'handcrafted-leather-belt',
    nameSr: 'Ručno rađeni kožni kaiš sa mesing kopčom "Signatura"',
    subtitleSr: 'Vrhunska teleća koža punog zrna sa ručno kovanom masivnom mesinganom kopčom',
    category: 'aksesoari',
    categoryLabelSr: 'Aksesoari',
    priceRSD: 11500,
    badge: 'Ručno rađeno',
    descriptionSr: 'Aksesoar koji transformiše svaku kombinaciju. Napravljen od jednog komada punomasne goveđe kože biljno štavljene u Toskani, ručno voskiran i poliran pčelinjim voskom.',
    storySr: 'Kopču od punog mesinga u starom stilu liju majstori livci po unikatnom crtežu Jelene Erić, a svaki rub kaiša se ručno boji u 4 sloja i polira drvenim gladilicama.',
    features: [
      '100% Italijanska punozrnata koža (Full-grain vegetable tanned leather)',
      'Livena mesingana kopča sa satenskim zlatnim finišem i gravurom ateljea',
      'Ručno voskiran konac debljine 0.8mm sa sedlarskim bodom (saddle stitch)',
      'Širina kaiša: 40 mm – idealan za blejzere, kapute i pantalone',
      'Dostupan u bojama: Obsidian Crna, Konjak Braon, Šampanjac Krem'
    ],
    materialsAndCare: {
      composition: 'Prirodna goveđa koža 3.5mm debljine, 100% liveni mesing',
      origin: 'Toskana (koža), Ručno krojeno i finiširano u Topoli',
      care: [
        'Čuvati od direktne vlage i izlaganja jakim toplotnim izvorima',
        'Tretirati prirodnim balzamom za kožu na svakih 6 meseci',
        'U slučaju kvašenja, osušiti na sobnoj temperaturi prirodno'
      ]
    },
    sizes: ['75 cm (XS)', '80 cm (S)', '85 cm (M)', '90 cm (L)', '95 cm (XL)', 'Dužina po meri'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '2–3 radna dana',
    modelInfo: 'Univerzalni model sa 7 rupica za prilagođavanje'
  },
  {
    id: 'bespoke-silk-slip-dress',
    nameSr: 'Svilena haljina otvorenih leđa "Sirena"',
    subtitleSr: 'Krojena po kosini (bias-cut) od teškog svilenog krepa sa tankim podesivim trakama',
    category: 'haljine',
    categoryLabelSr: 'Haljine po meri',
    priceRSD: 32000,
    badge: 'Kroj po kosini',
    descriptionSr: 'Haljina koja prati svaki pokret tela sa prirodnom fluidnošću. Šivena tradicionalnom tehnikom krojenja po kosini (bias cut) koja tkanini daje elastičnost bez ijednog procenta sintetike.',
    storySr: 'Klasična estetika 90-ih oživljena kroz najfiniju sirovu svilu. Duboki izrez na leđima ukrašen je delikatnim ukrštenim svilenim vrpcama.',
    features: [
      '100% Svileni krep-satena 22 momme (Como, Italija)',
      'Konstrukcija krojena pod uglom od 45 stepeni za savršeno prianjanje',
      'Ručno pletene svilene vrpce sa zlatnim završecima',
      'Može se nositi samostalno ili ispod strukiranog blejzera "Aura"'
    ],
    materialsAndCare: {
      composition: '100% Čista krep-svila',
      origin: 'Italijanska svila, sašiveno u ateljeu u Topoli',
      care: ['Hemijsko čišćenje ili ručno pranje u hladnoj vodi', 'Peglanje sa naličja']
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '4–6 radnih dana',
    modelInfo: 'Model je visoka 180 cm i nosi veličinu S (36)'
  },
  {
    id: 'high-waist-wool-trousers',
    nameSr: 'Vunene pantalone visokog struka "Palazzo"',
    subtitleSr: 'Široke pantalone ravnog pada sa dubokim faltama i unutrašnjim satenskim pojasom',
    category: 'blejzeri',
    categoryLabelSr: 'Pantalone & Odelo',
    priceRSD: 24500,
    badge: 'Italijanska vuna',
    descriptionSr: 'Pantalone "Palazzo" pružaju skulpturalnu siluetu i izdužuju figuru zahvaljujući visokom struku i precizno proračunatim prednjim faltama. Savršen par uz blejzer "Aura".',
    storySr: 'Kreirane za žene koje traže beskompromisni komfor i sofisticiranost u toku celog dana.',
    features: [
      '100% tanka fina runska vuna koja se ne gužva',
      'Unutrašnji pojas opšiven svilenim ripsom koji sprečava klizanje bluze',
      'Duboki bočni kosi džepovi i zadnji paspulirani džepovi',
      'Produženi porub sa 5 cm rezerve za individualno podešavanje visine potpetice'
    ],
    materialsAndCare: {
      composition: '100% Vuna hladnog dodira (Cool wool)',
      origin: 'Tkaonica Biella, Šiveno u Topoli',
      care: ['Hemijsko čišćenje', 'Čuvati na vešalici sa štipaljkama']
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '4–5 radnih dana',
    modelInfo: 'Model nosi veličinu S (36) sa potpeticama od 8 cm'
  },
  {
    id: 'cashmere-wrap-coat',
    nameSr: 'Kašmirski kaput na preklop "Imperijal"',
    subtitleSr: 'Luksuzni dugački kaput od mongolskog kašmira i runske vune sa širokim pojasom',
    category: 'blejzeri',
    categoryLabelSr: 'Kaputi po meri',
    priceRSD: 64000,
    badge: 'Limited Edition',
    descriptionSr: 'Kruna zimske kolekcije. Kaput "Imperijal" izrađen je od dvostruke tkanine sa 40% čistog kašmira, što mu daje neverovatnu lakoću uz vrhunsku toplotnu izolaciju i plišani dodir.',
    storySr: 'Za izradu jednog kaputa potrebno je preko 36 radnih sati majstora ateljea, uključujući ručno spajanje duplih rubova i ručno šivenje proreza za kaiš.',
    features: [
      '60% Devičanska runska vuna, 40% Organski mongolski kašmir',
      'Ručno šiveni dupli rubovi (Double-faced tehnika)',
      'Široki kimono rukavi i padajući šalić reveri',
      'Dolazi sa pripadajućim širokim vunenim pojasom i svilenom torbom za čuvanje'
    ],
    materialsAndCare: {
      composition: '40% Kašmir, 60% Devičanska vuna; Postava džepova: 100% Svila',
      origin: 'Italijanska pređa; Ručna izrada u Topoli',
      care: ['Isključivo specijalizovano hemijsko čišćenje za kašmir', 'Četkati mekom četkom od prirodne dlake']
    },
    sizes: ['S (36)', 'M (38)', 'L (40)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '10–14 radnih dana',
    modelInfo: 'Model je visoka 178 cm i nosi veličinu S/M'
  },
  {
    id: 'corset-top-gold-filigree',
    nameSr: 'Strukirani korset sa ručnim zlatovezom "Lumina"',
    subtitleSr: 'Korset od crnog tafta i satena sa ručno vezenim zlatnim motivima srpske baštine',
    category: 'svila',
    categoryLabelSr: 'Korseti & Topovi',
    priceRSD: 26000,
    badge: 'Zlatovez',
    descriptionSr: 'Spoj tradicionalnog zlatoveza i savremenog arhitektonskog korsetiranja. Ojačan sa 14 fleksibilnih fišbajna i vezivanjem na leđima svilenim gajtanom.',
    storySr: 'Ornamenti na prednjem delu inspirisani su srednjovekovnim fresko slikarstvom i preneti u minimalističku geometrijsku formu.',
    features: [
      'Crni italijanski svileni taft sa mat odsjajem',
      'Zlatni metalizirani konac proizveden u Lionu za ručni vez',
      'Podesivo pertlanje na leđima koje omogućava regulaciju u opsegu od 6 cm',
      'Može se kombinovati sa večernjim pantalonama, suknjom ili nositi preko bele košulje'
    ],
    materialsAndCare: {
      composition: '100% Svileni taft, pamučna unutrašnja postavka protiv klizanja',
      origin: 'Ručni vez i šivenje u Ateljeu Jelena Erić, Topola',
      care: ['Hemijsko čišćenje', 'Čuvati položeno']
    },
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'Izrada po ličnim merama'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    isCustomizable: true,
    leadTimeDays: '7–10 radnih dana',
    modelInfo: 'Model nosi veličinu S sa obimom struka 66 cm'
  }
];
