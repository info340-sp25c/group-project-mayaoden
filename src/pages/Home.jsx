// pages/Home.js - Updated with better user info layout
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";
import TouchCard from "../components/TouchCard";

function Home() {
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <>
      <header>
        <PageHeader
          title="🌱 Welcome to EcoTracker!"
          subtitle="Log your waste to reduce your impact and gain points!"
        />
      </header>

      <main>
        {/* User Profile Card */}
        <div className="container my-4">
          <div className="card shadow-sm border-0 bg-gradient" 
               style={{ 
                 background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                 color: 'white'
               }}>
            <div className="card-body py-4">
              <div className="row align-items-center">
                <div className="col-auto">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="rounded-circle border border-white border-3"
                      style={{ width: '80px', height: '80px' }}
                    />
                  ) : (
                    <div 
                      className="rounded-circle bg-white text-success d-flex align-items-center justify-content-center border border-white border-3"
                      style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                    >
                      👤
                    </div>
                  )}
                </div>
                <div className="col">
                  <h3 className="mb-1 fw-bold text-dark">
                    Hello, {currentUser?.displayName || userData?.name || 'User'}!
                  </h3>
                  <p className="mb-2 text-dark">
                    Keep up the great work making a difference! 🌍
                  </p>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-light text-success px-3 py-2 fs-6 fw-bold">
                      🏆 {userData?.points || 0} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="features">
          <TouchCard
            icon="🗑️"
            title="Log and Track Your Waste"
            description="Log your waste and see what you've previously logged."
            onClick={() => navigate("/log")}
          />
          <TouchCard
            icon="📊"
            title="Interactive Charts and Graphs"
            description="Track and explore your waste habits over time."
            onClick={() => navigate("/visualizations")}
          />
          <TouchCard
            icon="🏆"
            title="Community Leaderboard"
            description="See how your progress stacks up weekly!"
            onClick={() => navigate("/leaderboard")}
          />
        </section>
      </main>
    </>
  );
}

export default Home;