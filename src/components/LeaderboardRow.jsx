function LeaderboardRow({ rank, user, points, className }) {
  return (
    <tr className={className}>
      <td>{rank}</td>
      <td>{user}</td>
      <td>{points}</td>
    </tr>
  );
}

export default LeaderboardRow;
