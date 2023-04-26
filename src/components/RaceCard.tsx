import { Race } from '../types/ApiResponses.ts';

const RaceCard = ({ race }: { race: Race }) => {
  return (
    <div key={race.raceName}>
      <div>
        {race.round} - {race.Circuit.circuitName} - {race.Circuit.Location.country}
      </div>
      <div>Position</div>
    </div>
  );
};

export default RaceCard;
