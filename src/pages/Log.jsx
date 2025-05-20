import PageHeader from '../components/PageHeader';
import WeeklyStats from '../components/WeeklyStats';
import WeekCalendar from '../components/WeekCalendar';
import CardEntry from '../components/CardEntry';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewEntryButton from '../components/NewEntryButton';
import { loadLogs, deleteLog } from '../db';

function Log() {
    
    const totalLogs = 3;
    const streakDays = 1;

    const daysThisWeek = [
        { label: 'S', status: 'logged' },
        { label: 'M', status: 'logged' },
        { label: 'T', status: 'missed' },
        { label: 'W', status: 'logged' },
        { label: 'T', status: 'missed' },
        { label: 'F', status: 'missed' },
        { label: 'S', status: 'missed' }
    ];

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

  return (
    <>
      <PageHeader 
        title="📋 Waste Log"
        subtitle="Review your past entries and keep making eco-friendly choices!"
      />
      <main>
        <div className="stats-wrapper">
          <WeeklyStats totalLogs={totalLogs} streakDays={streakDays} />
          <WeekCalendar days={daysThisWeek} />
        </div>

        {logEntries.map((entry) => (
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
        ))}
        <NewEntryButton />
      </main>
    </>
  );
}

export default Log;
