import PageHeader from '../components/PageHeader';
import WeeklyStats from '../components/WeeklyStats';
import WeekCalendar from '../components/WeekCalendar';
import CardEntry from '../components/CardEntry';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewEntryButton from '../components/NewEntryButton';
import { loadLogs, deleteLog } from '../db';
import { isSameWeek, isSameDay, parseISO, subDays, format } from 'date-fns';

function Log() {
    
    const navigate = useNavigate();
    const [logEntries, setLogEntries] = useState([]);

    useEffect(() => {
        const sortedLogs = loadLogs().sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogEntries(sortedLogs);
    }, []);

    const handleEdit = (entry) => {
        navigate('/log/input', { state: { entry } });
    };

    const handleDelete = (id) => {
        deleteLog(id);
        setLogEntries(loadLogs());
    };

    const today = new Date();

    // Count logs in the current week
    const thisWeekLogs = logEntries.filter(entry =>
        isSameWeek(parseISO(entry.date), today, { weekStartsOn: 0 })
    );
    const totalLogs = thisWeekLogs.length;

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

    return (
        <>
        <PageHeader 
            title="📋 Waste Log"
            subtitle="Review your past entries and keep making eco-friendly choices!"
        />
        <main>
            <div className="stats-wrapper">
            <WeeklyStats totalLogs={logEntries.length} streakDays={streakDays} />
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
                        onEdit={() => handleEdit(entry)}
                        onDelete={() => handleDelete(entry.id)}
                    />
                ))
            )}
            <NewEntryButton />
        </main>
        </>
    );
}

export default Log;
