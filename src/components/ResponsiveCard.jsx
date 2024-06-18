import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResponsiveCard.css";

const ResponsiveCard = ({ name, location, users, tl, manager, imageUrl }) => {
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate("/admin");
  };

  return (
    <div className="ResponsiveCard">
      <div className="card-content">
        <img src={imageUrl} alt={`${name}'s profile`} className="profile-image" />
        <h2>
          {name}
          <br /> <span>{location}</span>
        </h2>
        <div className="data">
          <h3>
            {users}
            <br />
            <span>Users</span>
          </h3>
          <h3>
            {tl}
            <br />
            <span>TL</span>
          </h3>
          <h3>
            {manager}
            <br />
            <span>Manager</span>
          </h3>
        </div>
        <div className="action-buttons">
          <button onClick={handleOpenClick}>Open</button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCard;