import React from 'react';
import './SubComponents.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="guest-review-row">
      <div className="review-user-avatar">
        {review.name.charAt(0)}
      </div>
      <div className="review-text-stack">
        <div className="review-meta-line">
          <h4>{review.name}</h4>
          <span className="review-numeric-score">★ {review.rating.toFixed(1)}</span>
        </div>
        <p className="review-comment-body">"{review.comment}"</p>
      </div>
    </div>
  );
};

export default ReviewCard;