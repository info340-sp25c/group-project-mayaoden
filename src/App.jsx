import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Log from './pages/Log';
import Leaderboard from './pages/Leaderboard';
import Visualizations from './pages/Visualizations';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/visualizations" element={<Visualizations />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;