import { Link } from 'react-router-dom';

interface YearCardProps {
  year: string;
}

const YearCard = ({ year }: YearCardProps) => {
  return (
    <Link className="year-card-link" to={`/season/${year}`}>
      <div className="year-card">{year}</div>
    </Link>
  );
};

export default YearCard;
