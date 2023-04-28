import useSeasonStandings from '../hooks/useSeasonStandings.ts';
import { useContext, useEffect } from 'react';
import { SeasonWinnerContext } from '../contexts/WinnerContext.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import ErrorLoading from './Error.tsx';
import SeasonsWinnerShimmer from './shimmers/SeasonsWinnerShimmer.tsx';

const SeasonWinners = ({ year }: { year: string | undefined }) => {
  const { seasonStandings, isLoading, isError } = useSeasonStandings(year || '2005');
  const { setWinnerId } = useContext(SeasonWinnerContext);

  const driverStandings = seasonStandings.filter((seasonStanding) => {
    return Number(seasonStanding.position || Infinity) <= 3;
  });
  const topWinner = driverStandings?.[0]?.Driver.driverId;

  useEffect(() => {
    if (topWinner) setWinnerId(topWinner);
  }, [setWinnerId, topWinner]);

  if (isError) return <ErrorLoading />;
  if (isLoading) return <SeasonsWinnerShimmer />;

  const color: { [key: string]: string } = {
    '1': 'gold',
    '2': 'silver',
    '3': '#cd7f32',
  };

  return (
    <div className="season-standings">
      {driverStandings &&
        driverStandings
          .filter((d) => d)
          .map((driverData) => (
            <div key={driverData.Driver.driverId} className="champion-row">
              <FontAwesomeIcon icon={faTrophy} color={color[driverData.position]} />
              <div className="driver-name">
                {driverData.Driver.givenName} {driverData.Driver.familyName}
              </div>
              <span>{driverData.points} points</span>
            </div>
          ))}
    </div>
  );
};

export default SeasonWinners;
