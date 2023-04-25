interface YearCardProps {
  year: string;
  // onClick: (year: string, standings: F1DriverStandingsResponse) => void;
}

const YearCard = ({ year }: YearCardProps) => {
  const handleClick = () => {
    // if (data) {
    //   onClick(year, data);
    // }
  };

  // if (error) return <div>Error loading data</div>;

  return (
    <div className="year-card" onClick={handleClick}>
      {year}
    </div>
  );
};

export default YearCard;
