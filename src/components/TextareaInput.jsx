function TextareaInput({ label, id, placeholder, rows = 4, defaultValue }) {
  return (
    <>
      <label htmlFor={id} className="section-label">{label}</label>
      <textarea
        className="form-element"
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></textarea>
    </>
  );
}

export default TextareaInput;
