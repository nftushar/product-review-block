import React from "react";
import Rating from "../Components/Rating";

function Body(props) {
  const { attributes } = props;

  return (
    <div className="review-body">
      <Reviews attributes={attributes} />
    </div>
  );
}

export default Body;

const Reviews = (props) => {
  const { attributes } = props;

  return (
    <>
      <div className="review-left">
        <Review attributes={attributes} />
      </div>
      <div className="review-right">
        <Considerations />
      </div>
    </>
  );
};

const Review = (props) => {
  const { attributes } = props;

  return (
    <>
      <div className="review-left-features">
        <div className="review-left-content">
          <span className="review-heading">Stability</span>
          {/* Pass 'attributes' prop to the 'Rating' component */}
          <Rating attributes={attributes} />

          <span className="review-desc">Feature description</span>
        </div>
      </div>
    </>
  );
};

const Considerations = () => {
  return (
    <>
      <h3>Pros</h3>
      <div className="review-right-pros">
        <div className="review-right-pros-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z"></path>
          </svg>
          <p aria-label="Why do you like the product?">
            Sturdy build and ergonomics
          </p>
        </div>
        <div className="review-right-pros-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z"></path>
          </svg>
          <p aria-label="Why do you like the product?">Easy to use</p>
        </div>
        <div className="review-right-pros-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z"></path>
          </svg>
          <p aria-label="Why do you like the product?">Easy to use</p>
        </div>
      </div>
    </>
  );
};
