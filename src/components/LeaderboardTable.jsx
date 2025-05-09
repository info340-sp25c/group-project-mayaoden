import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <LeaderboardRow 
            key={item.rank} 
            rank={item.rank} 
            user={item.user} 
            points={item.points} 
            className={item.className} 
          />
        ))}
      </tbody>
    </table>
  );
}