function WeeklyStats({ totalLogs, streakDays }) {
  return (
    <div className="weekly-stats">
      <p><strong>Total entries this week:</strong> {totalLogs} logs</p>
      <p><strong>You're on a {streakDays}-day streak! 🌟</strong></p>
    </div>
  );
}

export default WeeklyStats;