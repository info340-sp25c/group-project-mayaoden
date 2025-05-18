import PageHeader from '../components/PageHeader';
import WeeklyStats from '../components/WeeklyStats';
import WeekCalendar from '../components/WeekCalendar';
import CardEntry from '../components/CardEntry';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NewEntryButton from '../components/NewEntryButton';


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

    const [logEntries, setLogEntries] = useState([
    {
        date: 'April 20, 2025',
        tagType: 'plastic',
        tagLabel: 'Plastic',
        summary: 'Medium, recycled, threw away cans at recycling center',
    },
    {
        date: 'April 18, 2025',
        tagType: 'food',
        tagLabel: 'Food',
        summary: 'Medium, composted, banana peels, coffee grounds',
    },
    {
        date: 'April 16, 2025',
        tagType: 'paper',
        tagLabel: 'Paper',
        summary: 'Small, reused, turned old flyers into scrap paper',
    }
    ]);

    const handleEdit = () => navigate('/log/input')

    return (
        <>
            <PageHeader 
                title="📋 Waste Log"
                subtitle="Review your past entries and keep making eco-friendly choices!"
            />
            <main>
                <div class="stats-wrapper">
                    <WeeklyStats totalLogs={totalLogs} streakDays={streakDays} />
                    <WeekCalendar days={daysThisWeek} />
                </div>

                {logEntries.map((entry, index) => (
                    <CardEntry
                        key={index}
                        {...entry}
                        onEdit={handleEdit}
                        onDelete={() => {
                        setLogEntries(prevEntries => prevEntries.filter((_, i) => i !== index));
                        }}                    
                    />
                ))}
                <NewEntryButton />
            </main>
        </>
        
    )
}

export default Log;