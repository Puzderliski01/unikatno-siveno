export const VIP_TIERS = [
  {
    id: 'none',
    name: 'Standard',
    color: '#e8e0d4',
    benefits: [
      'Potpun pristup kolekciji',
      'Regularne cene',
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
      'Prístup do limited edition primeraka 24h pre ostalih',
      'Besplatne porudžbine preko 15.000 RSD',
      'Eksklusivni mesečni newsletter'
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
      'Besplatne porudžbine',
      'Eksklusivni pristup VIP kolekciji',
      'Personalni stilistički savetnik',
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
      'VIP podrška iste sekunde, 24/7',
      'Eksklusivni pristop sve limited edition i 1 of 1 komada',
      'Besplatna portant i brza dostava',
      'Personalni stilistički savetnik dostupan 24/7'
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