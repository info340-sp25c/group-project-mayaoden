import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PieChartComponent({ recycled, composted, landfill }) {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);
  
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Cleanup previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Compost', 'Landfill', 'Recycling'],
          datasets: [{
            data: [composted, landfill, recycled],
            backgroundColor: [
              '#8BC34A',
              '#795548',
              '#2196F3'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          animation: {
            duration: 5000
          }
        }
      });
      
      // Cleanup function to destroy chart when component unmounts
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, [recycled, composted, landfill]);
  
  return (
    <canvas ref={chartRef}></canvas>
  );
}

PieChartComponent.defaultProps = {
  recycled: 42,
  composted: 35,
  landfill: 23
};

export default PieChartComponent;