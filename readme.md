# EcoTracker - Waste Reduction Tracking Application

**Live Website**: [https://group-project-mayaoden.web.app/](https://group-project-mayaoden.web.app/)

EcoTracker helps individuals track their waste reduction habits, visualize their environmental impact, and compete with others in a community leaderboard.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd group-project-mayaoden
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Firebase configuration is in `src/index.jsx`
   - Ensure you have access to the Firebase project or configure your own

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Problem We're Solving

Many individuals lack awareness of how much waste they produce and where it should properly belong. Existing waste tracking tools are often not personalized enough, tedious to use, or costly. EcoTracker provides a free, accessible platform that delivers personalized insights and motivates users through gamification and community features.

## Key Features

**Waste Logging**: Log waste entries with types (Plastic, Paper, Food, Glass, Other), actions (Recycled, Composted, Landfill), and amounts. Edit and delete past entries. View weekly calendar of logged activities.

**Interactive Visualizations**: View waste composition pie charts, points progress over time, and statistics dashboard with total points and rank.

**Community Leaderboard**: Compete with other users on a weekly leaderboard. Sort by points or name. Top three users receive special recognition.

**Gamification System**: Earn points based on actions (Composting: 2.5x, Recycling: 2.0x, Landfill: 0.5x) multiplied by amount (Small: 1x, Medium: 2x, Large: 3x). Track consecutive day streaks.

**User Authentication**: Secure Firebase Authentication with personalized profiles and private data storage.

**Responsive Design**: Mobile-friendly interface that works on all devices.

## Technology Stack

- React 19 with Vite
- React Router DOM
- Firebase (Realtime Database, Authentication)
- Chart.js
- date-fns
- Custom CSS

## How It Works

1. Sign up or log in to access your dashboard
2. Log waste activities with the entry form
3. View statistics and visualizations
4. Check the leaderboard to see your ranking
5. Use the weekly calendar and streak counter to build habits

## Project Structure

```
src/
├── components/     # Reusable React components
├── contexts/       # React context providers
├── firebase/       # Firebase database functions
├── pages/          # Page components
├── App.jsx         # Main app with routing
└── index.jsx       # Entry point
```

## Authors

- Connor Lam
- Justin Zhan
- Yuhan Cao
- Maya Odenheim

This project was created for INFO 340 at the University of Washington.
