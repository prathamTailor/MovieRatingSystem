import { Rating } from "@material-ui/lab";
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      {/* <img src={profilePng} alt="User" /> */}
      <p>User id : {review.userId}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.reviewDescription}</span>
    </div>
  );
};

export default ReviewCard;