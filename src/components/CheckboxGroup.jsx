function CheckboxGroup({ title, name, options, defaultValue = [], className = '' }) {
    const selectedValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];

    return (
        <div>
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
                            defaultChecked={selectedValues.includes(option.value)}
                        />
                        <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CheckboxGroup;
