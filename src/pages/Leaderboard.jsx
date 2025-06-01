import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LeaderboardTable from '../components/LeaderboardTable';
import PageHeader from '../components/PageHeader';
import { listenToLeaderboard, updateUserProfile } from '../firebase/Database';

function Leaderboard() {
    const { currentUser, userData } = useAuth();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [sortOrder, setSortOrder] = useState("points");
    const [isLoading, setIsLoading] = useState(true);
    
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

    // Ensure current user is in the leaderboard
    useEffect(() => {
        if (currentUser && userData && leaderboardData.length > 0) {
            const userInLeaderboard = leaderboardData.find(user => user.id === currentUser.uid);
            if (!userInLeaderboard) {
                // Add current user to database if not present
                updateUserProfile(currentUser.uid, {
                    name: currentUser.displayName || userData.name || 'Anonymous',
                    email: currentUser.email,
                    points: userData.points || 0,
                    photoURL: currentUser.photoURL || userData.photoURL
                });
            }
        }
    }, [currentUser, userData, leaderboardData]);
    
    const handleSort = (sortBy) => {
        let sortedData = [...leaderboardData];
        
        if (sortBy === "points") {
            // Sort by points first
            sortedData.sort((a, b) => b.points - a.points);
            // Assign ranks and classes based on points order
            sortedData = sortedData.map((item, index) => ({
                ...item,
                rank: index + 1,
                className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
            }));
        } else if (sortBy === "name") {
            // Get the points-based ranks first
            const pointsRanks = [...leaderboardData]
                .sort((a, b) => b.points - a.points)
                .reduce((acc, item, index) => {
                    acc[item.id] = {
                        rank: index + 1,
                        className: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""
                    };
                    return acc;
                }, {});
            
            // Sort by name but keep points-based ranks
            sortedData.sort((a, b) => a.user.localeCompare(b.user));
            sortedData = sortedData.map(item => ({
                ...item,
                rank: pointsRanks[item.id].rank,
                className: pointsRanks[item.id].className
            }));
        }
        
        setLeaderboardData(sortedData);
        setSortOrder(sortBy);
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
                            <p>No participants yet. Start logging waste activities to join the leaderboard!</p>
                        </div>
                    ) : (
                        <LeaderboardTable 
                            data={leaderboardData} 
                            currentUserId={currentUser?.uid}
                        />
                    )}
                </section>
                
                <section style={{ marginTop: '2rem' }}>
                    <div style={{
                        background: '#e7f3ff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #b3d9ff'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#0066cc' }}>How to Join the Leaderboard</h3>
                        <p>Start logging your waste reduction activities to automatically appear on the leaderboard and earn points!</p>
                        <button 
                            onClick={() => window.location.href = '/log/input'}
                            style={{
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Log Your Entry
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Leaderboard;