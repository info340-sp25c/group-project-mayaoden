function WeeklyStats({ totalLogs, streakDays }) {
    let message;

    if (streakDays === 0) {
        message = <> Start logging today! ✍️</>;
    } else if (streakDays === 1) {
        message = <> Nice start! 🔥</>;
    } else if (streakDays < 5) {
        message = <> Keep going! ✅</>;
    } else if (streakDays < 10) {
        message = <> Impressive! 🌟</>;
    } else {
        message = <> You're a pro! 🏆</>;
    }

    return (
        <div className="weekly-stats">
            <p><strong>Total entries:</strong> {totalLogs} 📋</p>
            <p><strong>{streakDays}-day streak:</strong> {message}</p>
        </div>
    );
}

export default WeeklyStats;
