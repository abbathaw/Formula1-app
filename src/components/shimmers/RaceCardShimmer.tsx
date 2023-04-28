const ShimmerRaceCard = () => {
  return (
    <div className="race-card shimmer-race-card">
      <div className="race-header">
        <div className="shimmer-header shimmer"></div>
      </div>
      <div className="race-subtitle">
        <div className="shimmer-subtitle shimmer"></div>
      </div>
      <div className="driver-standings">
        <div className="driver-row">
          <div className="driver-position">1</div>
          <div className="driver-name shimmer-driver-row shimmer"></div>
          <div className="driver-constructor shimmer-driver-row shimmer"></div>
          <div className="driver-pointz shimmer-driver-row shimmer"></div>
        </div>
        <div className="driver-row">
          <div className="driver-position">2</div>
          <div className="driver-name shimmer-driver-row shimmer"></div>
          <div className="driver-constructor shimmer-driver-row shimmer"></div>
          <div className="driver-pointz shimmer-driver-row shimmer"></div>
        </div>
        <div className="driver-row">
          <div className="driver-position">3</div>
          <div className="driver-name shimmer-driver-row shimmer"></div>
          <div className="driver-constructor shimmer-driver-row shimmer"></div>
          <div className="driver-pointz shimmer-driver-row shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerRaceCard;
