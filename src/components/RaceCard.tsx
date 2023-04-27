import { Race, RaceResult } from '../types/ApiResponses.ts';
import { useContext } from 'react';
import { SeasonWinnerContext } from '../contexts/WinnerContext.tsx';
import Flag from 'react-world-flags';
import { countryCodeList } from '../utils/countryCodeList.ts';

const RaceCard = ({ race, results }: { race: Omit<Race, 'Results'>; results: RaceResult[] }) => {
  const { winnerId } = useContext(SeasonWinnerContext);

  const driverStandings = results.filter((raceStandings) => {
    return Number(raceStandings.position || Infinity) <= 3;
  });
  return (
    <div className="race-card">
      <div className="race-header">
        <div>
          <Flag code={countryCodeList[race.Circuit.Location.country]} />
        </div>
        <div>{race.Circuit.Location.country}</div>
      </div>
      <div className="race-subtitle">
        <div>
          {race.Circuit.circuitName} - {race.date}
        </div>
      </div>
      <div className="driver-standings">
        {driverStandings.map((driverData) => (
          <div
            key={driverData.Driver.driverId}
            className={winnerId && winnerId === driverData.Driver.driverId ? 'winner-row driver-row' : 'driver-row'}
          >
            <div className="driver-position">{driverData.position}</div>
            <div className="driver-name">
              {driverData.Driver.givenName} {driverData.Driver.familyName}
            </div>
            <div className="driver-constructor">{driverData.Constructor.name}</div>
            <div className="driver-points">{driverData.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCard;
