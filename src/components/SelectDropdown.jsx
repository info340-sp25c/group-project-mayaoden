import React from 'react';

function SelectDropdown({ label, name, options }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="section-label">{label}</label>
        <select id={name} name={name}>
            <option value="">-- Select One --</option>
            {options.map((option) => (
            <option key={option.value || option.label} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
    </div>
  );
}

export default SelectDropdown;
