import { useState } from 'react';
import StatsGrid from '../components/StatsGrid';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';

function Visualizations() {
    const [wasteData, setWasteData] = useState({
      totalPoints: 1295,
      rank: '3rd',
      wasteComposition: {
        recycled: 42,
        composted: 35,
        landfill: 23
      },
      pointsProgress: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        data: [0, 400, 600, 800, 950, 1100, 1295]
      }
    });
  
    return (
      <>
        {/* <header>
          <h1>🌱 Waste Reduction Progress</h1>
          <p>Track your progress and compete with others weekly!</p>
        </header> */}

        <PageHeader 
          title="🌱 Waste Reduction Progress"
          subtitle="Track your progress and compete with others weekly!"
        />
        
        <main>
          <section className="stats-summary">
            <h2>Your Waste Reduction Summary</h2>
            <StatsGrid 
              totalPoints={wasteData.totalPoints} 
              rank={wasteData.rank} 
              recycled={wasteData.wasteComposition.recycled}
              composted={wasteData.wasteComposition.composted}
              landfill={wasteData.wasteComposition.landfill}
            />
          </section>
  
          <section className="visualization-container">
            <div className="chart-container">
              <h2>Waste Composition</h2>
              <PieChartComponent 
                recycled={wasteData.wasteComposition.recycled}
                composted={wasteData.wasteComposition.composted}
                landfill={wasteData.wasteComposition.landfill}
              />
            </div>
            
            <div className="chart-container">
              <h2>Points Progress</h2>
              <LineChartComponent 
                labels={wasteData.pointsProgress.labels}
                data={wasteData.pointsProgress.data}
              />
            </div>
          </section>
        </main>
      </>
    );
  }
  
  export default Visualizations;