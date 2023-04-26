import { Race } from '../types/ApiResponses.ts';
import { useContext } from 'react';
import { SeasonWinnerContext } from '../contexts/WinnerContext.tsx';

const RaceCard = ({ race }: { race: Race }) => {
  const { winnerId } = useContext(SeasonWinnerContext);

  const driverStandings = race.Results.filter((raceStandings) => {
    return Number(raceStandings.position || Infinity) <= 3;
  });
  return (
    <div className="race-card">
      <div>
        {race.round} - {race.Circuit.circuitName} - {race.Circuit.Location.country}
      </div>
      <div>
        {driverStandings.map((driverData) => (
          <div key={driverData.Driver.driverId}>
            <div className={winnerId && winnerId === driverData.Driver.driverId ? 'winner-row' : 'driver-row'}>
              {driverData.Driver.givenName} {driverData.Driver.familyName}
            </div>
            <div>
              Position: {driverData.position} - Points: {driverData.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCard;
