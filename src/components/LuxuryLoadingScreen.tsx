import React from 'react';

interface LuxuryLoadingScreenProps {
  isLoading: boolean;
}

export const LuxuryLoadingScreen: React.FC<LuxuryLoadingScreenProps> = React.memo(({ isLoading }) => {
  return (
    <div className={`luxury-loading-screen ${!isLoading ? 'loaded' : ''}`}>
      {/* Animated Scissors */}
      <div className="loading-scissors" />

      {/* Thread shimmer line */}
      <div className="loading-thread" />

      {/* Pulsing brand text */}
      <div className="loading-text">Unikatno šiveno - Jelena Eric</div>
    </div>
  );
});
