export const VIP_TIERS = [
  {
    id: 'none',
    name: 'Standard',
    color: '#e8e0d4',
    benefits: [
      'Standardi pristup kolekciji',
      'Regularne cijene',
      'Osobna poziva na eventi',
      'Standardna podrška'
    ],
    requiresPoints: 0
  },
  {
    id: 'silver',
    name: 'Srebrni',
    color: '#c0c0c0',
    benefits: [
      '5% popust na sve porudžbine',
      'Prioritetna podrška',
      'Prístup do limited edition komadova 24h pre ostalih',
      'Besplatna portant za porudžbine preko 15.000 RSD',
      'Eksklusivni mesezni newsletter'
    ],
    requiresPoints: 1000
  },
  {
    id: 'gold',
    name: 'Zlatni',
    color: '#ffd700',
    benefits: [
      '10% popust na sve porudžbine',
      'Prioritetna podrška 24/7',
      'Prístop do limited edition komadova 48h pre ostalih',
      'Besplatna portant za sve porudžbine',
      'Eksklusivni pristup VIP kolekciji',
      'Personalni stilistički savetnik',
      'Poziv na godišnji VIP veče',
      'Prvi pristup novim kolekcijama'
    ],
    requiresPoints: 2500
  },
  {
    id: 'platinum',
    name: 'Platinum',
    color: '#e5e4e2',
    benefits: [
      '15% popust na sve porudžbine',
      'VIP koncierž podrška',
      'Eksklusivni pristop sve limited edition i 1 of 1 komadova',
      'Besplatna portant i brza dostava',
      'Personalni stilistički savetnik dostupan 24/7',
      'Poziv na sve eksklusivne eventi',
      'Godišnji gratuit komad po izboru',
      'Prvi pristop novim kolekcijama + dodatni komad kao poklon',
      'Prilagođen šivački termin u atelieru',
      'Pristop do arhivske kolekcije'
    ],
    requiresPoints: 5000
  }
];

export const getVIPTierByLevel = (level: string) => {
  return VIP_TIERS.find(tier => tier.id === level) || VIP_TIERS[0];
};

export const calculateVIPProgress = (currentPoints: number, currentLevel: string) => {
  const currentTier = getVIPTierByLevel(currentLevel);
  const currentIndex = VIP_TIERS.findIndex(tier => tier.id === currentLevel);

  if (currentIndex === VIP_TIERS.length - 1) {
    return {
      currentTier,
      nextTier: null,
      progress: 100,
      pointsNeeded: 0,
      pointsUntilNext: 0
    };
  }

  const nextTier = VIP_TIERS[currentIndex + 1];
  const pointsNeeded = nextTier.requiresPoints - currentTier.requiresPoints;
  const pointsEarned = currentPoints - currentTier.requiresPoints;
  const progress = (pointsEarned / pointsNeeded) * 100;

  return {
    currentTier,
    nextTier,
    progress: Math.min(100, Math.max(0, progress)),
    pointsNeeded,
    pointsUntilNext: nextTier.requiresPoints - currentPoints
  };
};