import useRaceList from '../hooks/useRaceList.ts';
import RaceCard from './RaceCard.tsx';
import Loading from './Loading.tsx';
import ErrorLoading from './Error.tsx';

const RaceList = ({ year }: { year: string | undefined }) => {
  const { raceList, isLoading, isError } = useRaceList(year || '2005');
  if (isError) return <ErrorLoading />;
  if (isLoading) return <Loading />;

  if (raceList && Object.keys(raceList).length === 0) {
    return <div className="season-races">No races found</div>;
  }

  return (
    <div className="season-races">
      {Object.keys(raceList).map((raceKey, index) => (
        <RaceCard key={`${index}_${raceKey}`} race={raceList[raceKey].race} results={raceList[raceKey].results} />
      ))}
    </div>
  );
};

export default RaceList;
