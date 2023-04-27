import { Link, useParams } from 'react-router-dom';
import SeasonWinners from './SeasonWinners.tsx';
import RaceList from './RaceList.tsx';
import WinnerContext from '../contexts/WinnerContext.tsx';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const SeasonContainer = () => {
  const { year } = useParams();

  return (
    <WinnerContext>
      <Helmet>
        <title>{year}</title>
      </Helmet>
      <div className="season-container">
        <Link className="back-button" to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} /> Back
        </Link>
        <h2>{year}</h2>
        <h3>Champions</h3>
        <SeasonWinners year={year} />
        <h3>Race List and Winners</h3>
        <RaceList year={year} />
      </div>
    </WinnerContext>
  );
};

export default SeasonContainer;
