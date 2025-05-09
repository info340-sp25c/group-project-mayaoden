
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChartComponent({ labels, data }) {
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
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Points',
            data: data,
            backgroundColor: '#4CAF50',
            borderColor: '#2E7D32',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Points'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Days'
              }
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
  }, [labels, data]);
  
  return (
    <canvas ref={chartRef}></canvas>
  );
}

LineChartComponent.defaultProps = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  data: [0, 400, 600, 800, 950, 1100, 1295]
};

export default LineChartComponent;