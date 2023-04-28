import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const SeasonsWinnerShimmer = () => {
  return (
    <>
      <div className="champion-row">
        <FontAwesomeIcon icon={faTrophy} color="gold" />
        <div className="driver-name shimmer-driver-row shimmer"></div>
        <span className="shimmer-driver-row shimmer"></span>
      </div>
      <div className="champion-row">
        <FontAwesomeIcon icon={faTrophy} color="silver" />
        <div className="driver-name shimmer-driver-row shimmer"></div>
        <span className="shimmer-driver-row shimmer"></span>
      </div>
      <div className="champion-row">
        <FontAwesomeIcon icon={faTrophy} color="#cd7f32" />
        <div className="driver-name shimmer-driver-row shimmer"></div>
        <span className="shimmer-driver-row shimmer"></span>
      </div>
    </>
  );
};

export default SeasonsWinnerShimmer;
