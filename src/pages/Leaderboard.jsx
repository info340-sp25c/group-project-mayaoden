import { useState, useEffect } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import PageHeader from '../components/PageHeader';
import { listenToLeaderboard, addUserToLeaderboard } from '../firebase/Database';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [newUser, setNewUser] = useState("");
    const [newPoints, setNewPoints] = useState("");
    const [sortOrder, setSortOrder] = useState("points");
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingUser, setIsAddingUser] = useState(false);
    
    useEffect(() => {
        // Set up real-time listener for leaderboard data
        const unsubscribe = listenToLeaderboard((data) => {
            setLeaderboardData(data);
            setIsLoading(false);
        });

        // Cleanup listener on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);
    
    const handleSort = (sortBy) => {
        let sortedData = [...leaderboardData];
        
        if (sortBy === "points") {
            sortedData.sort((a, b) => b.points - a.points);
        } else if (sortBy === "name") {
            sortedData.sort((a, b) => a.user.localeCompare(b.user));
        }
        
        // Reassign ranks and classes based on new order
        sortedData = sortedData.map((item, index) => ({
            ...item,
            rank: sortBy === "points" ? (leaderboardData.find(user => user.id === item.id)?.rank || index + 1) : index + 1,
            className: sortBy === "points" ? 
                (index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "") :
                (leaderboardData.find(user => user.id === item.id)?.className || "")
        }));
        
        setLeaderboardData(sortedData);
        setSortOrder(sortBy);
    };
    
    const handleAddUser = async (e) => {
        if (e) e.preventDefault();
        
        if (!newUser.trim()) {
            alert("Please enter a valid username");
            return;
        }

        // Check if user already exists
        const existingUser = leaderboardData.find(user => 
            user.user.toLowerCase() === newUser.trim().toLowerCase()
        );
        
        if (existingUser) {
            alert("User already exists in the leaderboard");
            return;
        }
        
        setIsAddingUser(true);
        
        try {
            const result = await addUserToLeaderboard(newUser.trim());
            
            if (result.success) {
                setNewUser("");
                setNewPoints("");
            } else {
                alert("Error adding user. Please try again.");
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert("Error adding user. Please try again.");
        } finally {
            setIsAddingUser(false);
        }
    };
    
    if (isLoading) {
        return (
            <>
                <PageHeader 
                    title="🏆📊 Waste Reduction Leaderboard"
                    subtitle="Track your progress and compete with others weekly!"
                />
                <main>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading leaderboard...</p>
                    </div>
                </main>
            </>
        );
    }
    
    return (
        <>
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
                    {leaderboardData.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>No participants yet. Be the first to join!</p>
                        </div>
                    ) : (
                        <LeaderboardTable data={leaderboardData} />
                    )}
                </section>
                
                <section className="add-user">
                    <h2>Add New Participant</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            disabled={isAddingUser}
                        />
                        <button 
                            onClick={handleAddUser}
                            className="submit-button"
                            disabled={isAddingUser || !newUser.trim()}
                        >
                            {isAddingUser ? "Adding..." : "Add User"}
                        </button>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                        Note: Points are automatically calculated based on waste log entries.
                    </p>
                </section>
            </main>
        </>
    );
}

export default Leaderboard;