function DeleteButton({ onClick }) {
  return (
    <button className="delete-btn" onClick={onClick}>
      🗑️ Delete
    </button>
  );
}

export default DeleteButton;
