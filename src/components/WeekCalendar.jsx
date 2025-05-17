function WeekCalendar({ days }) {
  return (
    <div className="week-calendar">
      <p><strong>🗓️ This Week</strong></p>
      <div className="week-days">
        {days.map((day, index) => (
          <div key={index} className={`day ${day.status}`}>
            {day.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekCalendar;
