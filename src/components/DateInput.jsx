function DateInput({ defaultValue }) {
  return (
    <>
      <label htmlFor="date" className="section-label">Date:</label>
      <input className="form-element" type="date" id="date" name="date" defaultValue={defaultValue} />
    </>
  );
}

export default DateInput;
