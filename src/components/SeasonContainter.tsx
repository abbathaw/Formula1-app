import { useParams } from 'react-router-dom';
import SeasonWinners from './SeasonWinners.tsx';
import RaceList from './RaceList.tsx';

const SeasonContainer = () => {
  const { year } = useParams();

  return (
    <div className="season-container">
      <h1>{year}</h1>
      <SeasonWinners year={year} />
      <RaceList year={year} />
    </div>
  );
};

export default SeasonContainer;
