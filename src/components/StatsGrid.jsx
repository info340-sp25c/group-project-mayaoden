import StatCard from './StatCard';

function StatsGrid({ totalPoints, rank, recycled, composted, landfill }) {
  return (
    <div className="stats-grid">
      <StatCard 
        title="Total Points"
        value={totalPoints.toLocaleString()}
        description={`Rank: ${rank}`}
      />
      <StatCard 
        title="Recycled"
        value={`${recycled}%`}
        description="of total waste"
        icon="recycle.png"
        iconAlt="Recycle icon"
      />
      <StatCard 
        title="Composted"
        value={`${composted}%`}
        description="of total waste"
        icon="compost.png"
        iconAlt="Compost icon"
      />
      <StatCard 
        title="Landfill"
        value={`${landfill}%`}
        description="of total waste"
        icon="landfill.png"
        iconAlt="Landfill icon"
      />
    </div>
  );
}

StatsGrid.defaultProps = {
  totalPoints: 0,
  rank: 'N/A',
  recycled: 0,
  composted: 0,
  landfill: 0
};

export default StatsGrid;