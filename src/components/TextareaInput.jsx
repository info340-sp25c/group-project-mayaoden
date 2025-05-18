function TextareaInput({ label, id, placeholder, rows = 4 }) {
  return (
    <>
      <label htmlFor={id} className="section-label">{label}</label>
      <textarea
        className="form-element"
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
      ></textarea>
    </>
  );
}

export default TextareaInput;
