// pages/Log.js - Updated to use authentication with your existing components
import PageHeader from '../components/PageHeader'; 
import WeeklyStats from '../components/WeeklyStats'; 
import WeekCalendar from '../components/WeekCalendar'; 
import CardEntry from '../components/CardEntry'; 
import NewEntryButton from '../components/NewEntryButton';
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import { isSameWeek, isSameDay, parseISO, subDays, format } from 'date-fns';
import { listenToLogs, deleteLog } from '../firebase/Database';
import { useAuth } from '../contexts/AuthContext';

function Log() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [logEntries, setLogEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState({});

    useEffect(() => {
        if (!currentUser) {
            setIsLoading(false);
            return;
        }

        // Set up real-time listener for log entries with user authentication
        const unsubscribe = listenToLogs((logs) => {
            setLogEntries(logs);
            setIsLoading(false);
        }, currentUser.uid); // Use actual user ID instead of 'default'

        // Cleanup listener on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentUser]);

    const handleEdit = (entry) => {
        navigate('/log/input', { state: { entry } });
    };

    const handleDelete = async (id) => {
        if (!currentUser) {
            alert('You must be logged in to delete entries');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this entry?')) {
            return;
        }
        
        setIsDeleting(prev => ({ ...prev, [id]: true }));
        
        try {
            const result = await deleteLog(id);
            if (!result.success) {
                alert('Error deleting entry. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            alert('Error deleting entry. Please try again.');
        } finally {
            setIsDeleting(prev => ({ ...prev, [id]: false }));
        }
    };

    // Show authentication required message if not logged in
    if (!currentUser) {
        return (
            <>
                <PageHeader 
                    title="📋 Waste Log"
                    subtitle="Please log in to access your waste tracking data"
                />
                <main>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3>Authentication Required</h3>
                        <p>You must be logged in to view and manage your waste log entries.</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </button>
                    </div>
                </main>
            </>
        );
    }

    const today = new Date();

    // Count logs in the current week
    const thisWeekLogs = logEntries.filter(entry =>
        isSameWeek(parseISO(entry.date), today, { weekStartsOn: 0 })
    );
    const totalLogs = thisWeekLogs.length;

    // Calculate streak
    const uniqueDates = Array.from(new Set(
        logEntries.map(entry => format(parseISO(entry.date), 'yyyy-MM-dd'))
    )).map(dateStr => parseISO(dateStr));

    uniqueDates.sort((a, b) => b - a);

    let streak = 0;
    let current = today;

    while (uniqueDates.some(date => isSameDay(date, current))) {
        streak++;
        current = subDays(current, 1);
    }

    const streakDays = streak;

    if (isLoading) {
        return (
            <>
                <PageHeader 
                    title="📋 Waste Log"
                    subtitle="Review your past entries and keep making eco-friendly choices!"
                />
                <main>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading your log entries...</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <PageHeader 
                title="📋 Waste Log"
                subtitle="Review your past entries and keep making eco-friendly choices!"
            />
            <main>
                <div className="stats-wrapper">
                    <WeeklyStats totalLogs={totalLogs} streakDays={streakDays} />
                    <WeekCalendar logEntries={logEntries}/>
                </div>

                {logEntries.length === 0 ? (
                    <div className="card-entry placeholder-entry">
                        <div className="card-left">
                            <p><strong>No entries yet...</strong></p>
                            <p className="summary-line">Log your first waste activity to get started!</p>
                        </div>
                    </div>
                ) : (
                    logEntries.map((entry) => (
                        <CardEntry
                            key={entry.id}
                            date={entry.date}
                            tagType={entry.tagType}
                            tagLabel={entry.tagLabel}
                            amount={entry.amount}
                            action={entry.action}
                            items={entry.items}
                            points={entry.points}
                            onEdit={() => handleEdit(entry)}
                            onDelete={() => handleDelete(entry.id)}
                            isDeleting={isDeleting[entry.id]}
                        />
                    ))
                )}
                <NewEntryButton />
            </main>
        </>
    );
}

export default Log;