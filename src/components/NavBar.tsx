import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useState } from 'react';
const NavBar = () => {
  const [animateLogo, setAnimateLogo] = useState(false);

  return (
    <nav className="nav-bar">
      <Link className="nav-link" to={'/'}>
        <div className="nav-item">
          <h1>F1</h1>
        </div>
      </Link>
      <Logo
        className={`nav-logo${animateLogo ? ' car-logo-animate' : ''}`}
        onClick={() => {
          setAnimateLogo(true);
          setTimeout(() => {
            setAnimateLogo(false);
          }, 2000);
        }}
      />{' '}
    </nav>
  );
};

export default NavBar;
