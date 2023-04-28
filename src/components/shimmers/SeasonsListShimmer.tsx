import YearCard from '../YearCard.tsx';

const SeasonListShimmer = () => {
  return (
    <div className="season-list">
      {getYearsArray().map((year) => (
        <YearCard key={year} year={year.toString()} />
      ))}
    </div>
  );
};

function getYearsArray() {
  const startYear = 2023;
  const endYear = 2005;
  const yearsArray = [];

  for (let year = startYear; year >= endYear; year--) {
    yearsArray.push(year);
  }

  return yearsArray;
}

export default SeasonListShimmer;
