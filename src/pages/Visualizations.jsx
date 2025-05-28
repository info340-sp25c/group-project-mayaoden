import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatsGrid from '../components/StatsGrid';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import PageHeader from '../components/PageHeader';
import { getAnalyticsData } from '../firebase/Database';

function Visualizations() {
    const { currentUser, userData } = useAuth();
    const [wasteData, setWasteData] = useState({
        totalPoints: 0,
        rank: 'Unranked',
        wasteComposition: {
            recycled: 0,
            composted: 0,
            reused: 0,
            repurposed: 0,
            other: 0
        },
        pointsProgress: {
            labels: [],
            data: []
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            loadAnalyticsData();
        } else {
            setIsLoading(false);
        }
    }, [currentUser]);

    const loadAnalyticsData = async () => {
        try {
            const data = await getAnalyticsData(currentUser.uid);
            setWasteData(data);
        } catch (error) {
            console.error('Error loading analytics data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <PageHeader 
                    title="🌱 Waste Reduction Progress"
                    subtitle="Track your progress and compete with others weekly!"
                />
                <main>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading your analytics...</p>
                    </div>
                </main>
            </>
        );
    }

    if (!currentUser) {
        return (
            <>
                <PageHeader 
                    title="🌱 Waste Reduction Progress"
                    subtitle="Track your progress and compete with others weekly!"
                />
                <main>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Please log in to view your analytics.</p>
                    </div>
                </main>
            </>
        );
    }

    // Check if user has any data
    const hasData = wasteData.totalPoints > 0 || 
                   Object.values(wasteData.wasteComposition).some(val => val > 0);

    return (
        <>
            <PageHeader 
                title="🌱 Waste Reduction Progress"
                subtitle={`Welcome back, ${currentUser.displayName || userData?.name || 'Anonymous'}!`}
            />
            
            <main>
                <section className="stats-summary">
                    <h2>Your Waste Reduction Summary</h2>
                    <StatsGrid 
                        totalPoints={wasteData.totalPoints}
                        rank={wasteData.rank}
                        recycled={wasteData.wasteComposition.recycled}
                        composted={wasteData.wasteComposition.composted}
                        reused={wasteData.wasteComposition.reused}
                        repurposed={wasteData.wasteComposition.repurposed}
                        other={wasteData.wasteComposition.other}
                    />
                </section>

                {!hasData ? (
                    <section style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ 
                            background: '#f8f9fa', 
                            padding: '2rem', 
                            borderRadius: '8px',
                            border: '2px dashed #dee2e6'
                        }}>
                            <h3>No Data Yet</h3>
                            <p>Start logging your waste activities to see your progress visualized here!</p>
                            <button 
                                onClick={() => window.location.href = '/log/input'}
                                style={{
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }}
                            >
                                Log Your First Entry
                            </button>
                        </div>
                    </section>
                ) : (
                    <section className="visualization-container">
                        <div className="chart-container">
                            <h2>Waste Actions Breakdown</h2>
                            <PieChartComponent 
                                recycled={wasteData.wasteComposition.recycled}
                                composted={wasteData.wasteComposition.composted}
                                reused={wasteData.wasteComposition.reused}
                                repurposed={wasteData.wasteComposition.repurposed}
                                other={wasteData.wasteComposition.other}
                            />
                        </div>
                        
                        <div className="chart-container">
                            <h2>Points Progress (Last 7 Days)</h2>
                            {wasteData.pointsProgress.data.length > 0 ? (
                                <LineChartComponent 
                                    labels={wasteData.pointsProgress.labels}
                                    data={wasteData.pointsProgress.data}
                                />
                            ) : (
                                <div style={{ 
                                    textAlign: 'center', 
                                    padding: '2rem',
                                    background: '#f8f9fa',
                                    borderRadius: '8px'
                                }}>
                                    <p>No recent activity to display</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                <section style={{ marginTop: '2rem' }}>
                    <div style={{
                        background: '#e7f3ff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #b3d9ff'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#0066cc' }}>Points System</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                                <strong>Composting:</strong> 2.5x points
                            </div>
                            <div>
                                <strong>Recycling:</strong> 2.0x points
                            </div>
                            <div>
                                <strong>Reusing:</strong> 2.0x points  
                            </div>
                            <div>
                                <strong>Repurposing:</strong> 2.0x points
                            </div>
                            <div>
                                <strong>Other/Landfill:</strong> 0.5x points
                            </div>
                        </div>
                        <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: 0 }}>
                            Points are also multiplied by amount: Small (1x), Medium (2x), Large (3x)
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Visualizations;