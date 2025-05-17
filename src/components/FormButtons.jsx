function FormButtons({ onSubmit, onCancel, submitLabel = "Submit", cancelLabel = "Cancel" }) {
  return (
    <div className="form-buttons">
      <button type="button" className="submit-button" onClick={onSubmit}>
        {submitLabel}
      </button>
      <button type="button" className="cancel-button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  );
}

export default FormButtons;
