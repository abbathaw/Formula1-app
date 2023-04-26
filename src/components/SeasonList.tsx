import useListSeasons from '../hooks/useListSeasons.ts';
import YearCard from './YearCard.tsx';

const SeasonList = () => {
  const { seasons, isLoading, isError } = useListSeasons();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {seasons.map((year) => {
        return <YearCard key={year.season} year={year.season} />;
      })}
    </div>
  );
};

export default SeasonList;
