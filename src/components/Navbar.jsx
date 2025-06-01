import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
     
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };
   
  return (
    <nav>
      <div className="navdiv">
        <div className="name">
          <Link to="/"><img src="/ecotrack-icon.png" alt="EcoTrack icon" className="logo-icon" /></Link>
          EcoTrack
        </div>
        <ul id="navLinks" className={menuOpen ? "active" : ""}>
          {currentUser ? (
            // Show navigation links when authenticated
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/log">Log Waste</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/visualizations">Progress</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2f2f2f',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    padding: 0
                  }}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            // Show login/signup when not authenticated
            <>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
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