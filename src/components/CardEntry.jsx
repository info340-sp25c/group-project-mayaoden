import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

function CardEntry({ date, tagType, amount, action, items, onEdit, onDelete }) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="card-entry">
            <div className="card-left">
                <p><strong>{formattedDate}</strong></p>
                <div className="tags-container">
                    {(Array.isArray(tagType) ? tagType : [tagType]).map((type) => (
                        <span key={type} className={`tag ${type}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                    ))}
                </div>
                <p className="summary-line">{`${amount}, ${Array.isArray(action) ? action.join(', ') : action}, ${items}`}</p>
            </div>
            <div className="card-actions">
                <EditButton onClick={onEdit} />
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}

export default CardEntry;
