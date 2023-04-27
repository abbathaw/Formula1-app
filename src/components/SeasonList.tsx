import useListSeasons from '../hooks/useListSeasons.ts';
import YearCard from './YearCard.tsx';
import ErrorLoading from './Error.tsx';
import Loading from './Loading.tsx';

const SeasonList = () => {
  const { seasons, isLoading, isError } = useListSeasons();

  if (isError) return <ErrorLoading />;
  if (isLoading) return <Loading />;

  return (
    <div className="season-list">
      {seasons.map((year) => {
        return <YearCard key={year.season} year={year.season} />;
      })}
    </div>
  );
};

export default SeasonList;
