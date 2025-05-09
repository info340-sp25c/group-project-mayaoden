import LeaderboardTable from '../components/LeaderboardTable';

function Leaderboard() {
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