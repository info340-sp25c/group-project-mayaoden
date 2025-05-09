import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="navdiv">
        <div className="name">
          <img src="/ecotrack-icon.png" alt="EcoTrack icon" className="logo-icon" />
          EcoTrack
        </div>
        <ul id="navLinks" className={menuOpen ? "active" : ""}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/log">Log Waste</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/visualizations">Progress</Link></li>
        </ul>
        <button 
          className="hamburger" 
          aria-label="Menu" 
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 