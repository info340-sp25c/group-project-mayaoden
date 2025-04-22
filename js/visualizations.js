'use strict';

const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
    labels: ['Compost', 'Landfill', 'Recycling'],
    datasets: [{
        data: [35, 23, 42],
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
    }
    }
});

// Line Chart - Points Progress
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
        label: 'Total Points',
        data: [0, 400, 600, 800, 950, 1100, 1295],
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
    }
    }
});