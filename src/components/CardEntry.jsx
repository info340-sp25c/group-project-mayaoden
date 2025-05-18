import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

function CardEntry({ date, tagType, tagLabel, summary, onEdit, onDelete }) {
  return (
    <div className="card-entry">
      <div className="card-left">
        <p><strong>{date}</strong></p>
        <p><span className={`tag ${tagType}`}>{tagLabel}</span></p>
        <p className="summary-line">{summary}</p>
      </div>
      <div className="card-actions">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
}

export default CardEntry;
