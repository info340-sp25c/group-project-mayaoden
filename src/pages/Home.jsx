// pages/Home.js - Updated with authentication
import React from "react";
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
          title={`🌱 Welcome ${currentUser?.displayName || userData?.name || 'User'}!`}
          subtitle="Log your waste to reduce your impact and gain points!"
        />
        
        {/* User info and logout section */}
        <div className="container mt-3">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <div className="d-flex align-items-center">
                {currentUser?.photoURL && (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
                <div>
                  <div className="fw-bold">{currentUser?.displayName || userData?.name}</div>
                  <div className="text-muted small">
                    Points: {userData?.points || 0} 🏆
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <button 
                onClick={handleLogout}
                className="btn btn-outline-secondary btn-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
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