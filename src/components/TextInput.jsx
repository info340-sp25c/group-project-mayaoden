function TextInput({ label, id, placeholder, defaultValue }) {
  return (
    <>
      <label htmlFor={id} className="section-label">{label}</label>
      <input
        className="form-element no-margin"
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </>
  );
}
export default TextInput;
