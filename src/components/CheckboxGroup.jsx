import React from 'react';

function CheckboxGroup({ title, name, options }) {
  return (
    <div>
      <label>{title}</label>

      <div className="form-element checkboxes">
        {options.map((option) => (
          <div key={option.value}>
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
