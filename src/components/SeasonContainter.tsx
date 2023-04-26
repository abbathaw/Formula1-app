import { useParams } from 'react-router-dom';
import SeasonWinners from './SeasonWinners.tsx';
import RaceList from './RaceList.tsx';
import WinnerContext from '../contexts/WinnerContext.tsx';

const SeasonContainer = () => {
  const { year } = useParams();

  return (
    <WinnerContext>
      <div className="season-container">
        <h1>{year}</h1>
        <SeasonWinners year={year} />
        <RaceList year={year} />
      </div>
    </WinnerContext>
  );
};

export default SeasonContainer;
