import { Link } from 'react-router-dom';

interface YearCardProps {
  year: string;
}

const YearCard = ({ year }: YearCardProps) => {
  return (
    <div className="year-card">
      <Link to={`/season/${year}`}>{year}</Link>
    </div>
  );
};

export default YearCard;
