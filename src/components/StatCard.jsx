import React from 'react';

function StatCard({ title, value, description, icon, iconAlt }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      {icon && <img src={icon} alt={iconAlt} className="img" />}
      <div className="stat-value">{value}</div>
      <p>{description}</p>
    </div>
  );
}

StatCard.defaultProps = {
  title: '',
  value: '',
  description: '',
  icon: null,
  iconAlt: ''
};

export default StatCard;