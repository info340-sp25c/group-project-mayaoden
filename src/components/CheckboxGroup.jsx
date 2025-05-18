import React from 'react';

function CheckboxGroup({ title, name, options }) {
  return (
    <div className="form-group">
      <label className="section-label">{title}</label>

      <div className="checkbox-group">
        {options.map((option) => (
          <div className="checkbox-item" key={option.value}>
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              aria-label={option.label}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
