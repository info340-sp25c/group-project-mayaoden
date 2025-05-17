function TextInput({ label, id, placeholder }) {
  return (
    <>
      <label htmlFor={id} className="section-label">{label}</label>
      <input
        className="form-element"
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </>
  );
}

export default TextInput;
