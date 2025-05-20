function WeeklyStats({ totalLogs, streakDays }) {
  let message;

  switch (true) {
      case streakDays === 0:
          message = <>Start logging today! ✍️</>;
          break;
      case streakDays === 1:
          message = <>Nice start! 🔥</>;
          break;
      case streakDays < 5:
          message = <>Keep going! ✅</>;
          break;
      case streakDays < 10:
          message = <>Impressive! 🌟</>;
          break;
      default:
          message = <>You're a pro! 🏆</>;
  }

  return (
      <div className="weekly-stats">
          <p><strong>Total entries:</strong> {totalLogs} 📋</p>
          <p><strong>{streakDays}-day streak:</strong> {message}</p>
      </div>
  );
}

export default WeeklyStats;
