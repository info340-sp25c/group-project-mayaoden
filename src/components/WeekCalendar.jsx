import { startOfWeek, endOfWeek, format, eachDayOfInterval, isSameDay, parseISO } from "date-fns";

function WeekCalendar({ logEntries }) {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 });

    const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(date => {
        const logged = logEntries.some(entry => isSameDay(parseISO(entry.date), date));
        return {
            label: format(date, "E").charAt(0),
            status: logged ? "logged" : "missed",
        };
    });

    const rangeLabel = `${format(weekStart, "M/d")} - ${format(weekEnd, "M/d")}`;

    return (
        <div className="week-calendar">
            <p><strong>🗓️ This Week ({rangeLabel})</strong></p>
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
