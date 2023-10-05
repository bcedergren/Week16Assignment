import React, { useState } from "react";
import "../styles/Stars.css";

const Stars = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleMouseOver = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (starRating) => {
    onRatingChange(starRating);
  };

  return (
    <div className='stars'>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            star <= (hoveredRating ?? rating) ? "filled" : ""
          }`}
          onMouseOver={() => handleMouseOver(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Stars;
