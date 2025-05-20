import React from "react";

const TouchCard = ({ icon, title, description, onClick }) => {
  return (
    <button className="feature-button" onClick={onClick}>
      {icon} {title}
      <br />
      <span>{description}</span>
    </button>
  );
};

export default TouchCard;
