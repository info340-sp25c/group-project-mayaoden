function DateInput() {
  return (
    <>
      <label htmlFor="date" className="section-label">Date:</label>
      <input className="form-element" type="date" id="date" name="date" />
    </>
  );
}

export default DateInput;