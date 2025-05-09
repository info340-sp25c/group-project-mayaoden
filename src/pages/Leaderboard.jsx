import { useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([
        { rank: 1, user: "Hannah", points: 1420, className: "gold" },
        { rank: 2, user: "Justin", points: 1350, className: "silver" },
        { rank: 3, user: "Conno", points: 1295, className: "bronze" },
        { rank: 4, user: "Maya", points: 1200 },
        { rank: 5, user: "Hello hello", points: 1175 },
    ]);

    return (
        <>
        <header>
            <h1>🌱 Waste Reduction Leaderboard</h1>
            <p>Track your progress and compete with others weekly!</p>
        </header>

        <main>
            <section className="leaderboard">
                <LeaderboardTable data={leaderboardData} />
            </section>
        </main>
        </>
        
    )
}


export default Leaderboard;