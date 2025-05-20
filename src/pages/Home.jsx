import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import TouchCard from "../components/TouchCard";

function Home() {
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
            onClick={() => (window.location.href = "log.html")}
          />
          <TouchCard
            icon="📊"
            title="Interactive Charts and Graphs"
            description="Track and explore your waste habits over time."
            onClick={() => (window.location.href = "visualizations.html")}
          />
          <TouchCard
            icon="🏆"
            title="Community Leaderboard"
            description="See how your progress stacks up weekly!"
            onClick={() => (window.location.href = "leaderboard.html")}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
