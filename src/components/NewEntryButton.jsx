import { useNavigate } from 'react-router-dom';

function NewEntryButton({ label = "Start New Entry", to = "/log/input" }) {
  const navigate = useNavigate();

  return (
    <button className="new-entry-button" onClick={() => navigate(to)}>
      {label}
    </button>
  );
}

export default NewEntryButton;
