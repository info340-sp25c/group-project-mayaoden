import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TouchCard from "../components/TouchCard";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <PageHeader
          title="🌱 Waste Reduction Home"
          subtitle="Log your waste to reduce your impact and gain points!"
        />
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
