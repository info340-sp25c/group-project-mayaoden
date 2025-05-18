function FileUploadInput({ label, id }) {
  return (
    <>
      <label htmlFor={id} className="section-label">{label}</label>
      <input
        className="form-element"
        type="file"
        id={id}
        name={id}
      />
    </>
  );
}

export default FileUploadInput;
