import useSeasonStandings from '../hooks/useSeasonStandings.ts';
import { useContext, useEffect } from 'react';
import { SeasonWinnerContext } from '../contexts/WinnerContext.tsx';

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

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="season-standings">
      {driverStandings &&
        driverStandings
          .filter((d) => d)
          .map((driverData) => (
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
