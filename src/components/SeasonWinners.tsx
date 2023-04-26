import useSeasonStandings from '../hooks/useSeasonStandings.ts';
import { useParams } from 'react-router-dom';

const SeasonWinners = () => {
  const { year } = useParams();
  const { seasonStandings, isLoading, isError } = useSeasonStandings(year || '2005');
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const driverStandings = seasonStandings.filter((seasonStanding) => {
    return Number(seasonStanding.position || Infinity) <= 3;
  });
  return (
    <div>
      {driverStandings.map((driverData) => (
        <div key={driverData.Driver.driverId}>
          <div>
            {driverData.Driver.givenName} {driverData.Driver.familyName}
          </div>
          <div>
            Position: {driverData.position} - Points: {driverData.points}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeasonWinners;
