import { useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import PageHeader from '../components/PageHeader';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([
        { rank: 1, user: "Hannah", points: 1420, className: "gold" },
        { rank: 2, user: "Justin", points: 1350, className: "silver" },
        { rank: 3, user: "Conno", points: 1295, className: "bronze" },
        { rank: 4, user: "Maya", points: 1200 },
        { rank: 5, user: "Hello hello", points: 1175 },
    ]);
    
    const [newUser, setNewUser] = useState("");
    const [newPoints, setNewPoints] = useState("");
    const [sortOrder, setSortOrder] = useState("points"); 
    
    const handleSort = (sortBy) => {
        let sortedData = [...leaderboardData];
        
        if (sortBy === "points") {
            sortedData.sort((a, b) => b.points - a.points);
        } else if (sortBy === "name") {
            sortedData.sort((a, b) => a.user.localeCompare(b.user));
        }
        
        sortedData = sortedData.map((item, index) => ({
            ...item,
            rank: index + 1,
            className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
        }));
        
        setLeaderboardData(sortedData);
        setSortOrder(sortBy);
    };
    
    const handleAddUser = (e) => {
        if (e) e.preventDefault();
        
        if (!newUser || !newPoints || isNaN(parseInt(newPoints))) {
            alert("Please enter a valid username and points");
            return;
        }
        
        const pointsValue = parseInt(newPoints);
        const newEntry = {
            user: newUser,
            points: pointsValue,
            rank: 0, 
        };
        
        const unsortedData = [...leaderboardData, newEntry];
        
        let sortedData = [...unsortedData];
        if (sortOrder === "points") {
            sortedData.sort((a, b) => b.points - a.points);
        } else if (sortOrder === "name") {
            sortedData.sort((a, b) => a.user.localeCompare(b.user));
        }
        
        sortedData = sortedData.map((item, index) => ({
            ...item,
            rank: index + 1,
            className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
        }));
        
        setLeaderboardData(sortedData);
        
        setNewUser("");
        setNewPoints("");
    };
    
    return (
        <>
        {/* <header>
            <h1>🌱 Waste Reduction Leaderboard</h1>
            <p>Track your progress and compete with others weekly!</p>
        </header> */}

        <PageHeader 
            title="🏆📊 Waste Reduction Leaderboard"
            subtitle="Track your progress and compete with others weekly!"
        />
        
        <main>
            <div className="controls">
                <div className="sort-buttons">
                    <span>Sort by:</span>
                    <button 
                        onClick={() => handleSort("points")}
                        className={sortOrder === "points" ? "active" : ""}
                    >
                        Points
                    </button>
                    <button 
                        onClick={() => handleSort("name")}
                        className={sortOrder === "name" ? "active" : ""}
                    >
                        Name
                    </button>
                </div>
            </div>
            
            <section className="leaderboard">
                <LeaderboardTable data={leaderboardData} />
            </section>
            
            <section className="add-user">
                <h2>Add New Participant</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Points"
                        value={newPoints}
                        onChange={(e) => setNewPoints(e.target.value)}
                    />
                    <button 
                        onClick={handleAddUser}
                        className="submit-button"
                    >
                        Add User
                    </button>
                </div>
            </section>
        </main>
        </>
    );
}

export default Leaderboard;