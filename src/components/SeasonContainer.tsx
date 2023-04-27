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
      <section className="season-container">
        <Link className="back-button" to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} /> Back
        </Link>
        <div>
          <h2>{year}</h2>
        </div>
        <div className="container">
          <h3>Champions</h3>
          <SeasonWinners year={year} />
        </div>
        <div className="container">
          <h3>Rounds and Winners</h3>
          <RaceList year={year} />
        </div>
      </section>
    </WinnerContext>
  );
};

export default SeasonContainer;
