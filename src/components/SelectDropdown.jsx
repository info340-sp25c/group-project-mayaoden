function SelectDropdown({ label, name, options, defaultValue }) {
  return (
    <>
      <label htmlFor={name} className="section-label">{label}</label>
        <select id={name} name={name} defaultValue={defaultValue}>
            <option value="">-- Select One --</option>
            {options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
    </>
  );
}

export default SelectDropdown;
