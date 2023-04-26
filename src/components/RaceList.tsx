import useRaceList from '../hooks/useRaceList.ts';
import RaceCard from './RaceCard.tsx';

const RaceList = ({ year }: { year: string | undefined }) => {
  const { raceList, isLoading, isError } = useRaceList(year || '2005');
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="season-races">
      {raceList.map((race, index) => (
        <RaceCard key={`${index}_${race.raceName}`} race={race} />
      ))}
    </div>
  );
};

export default RaceList;
