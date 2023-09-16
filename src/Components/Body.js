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
        <Considerations attributes={attributes} />
      </div>
    </>
  );
};

const Review = (props) => {
  const { attributes } = props;
  const { ratings } = attributes;
  // const { title, rating, description } = ratings;
  // console.log(ratings);

  return (
    <>
      {ratings.map((item, index) => (
        <div
          key={index}
          className="review-left-features"
          id={`productReviews-${index + 1}`}
        >
          <div className="review-left-content">
            <span className="review-heading">{item.title}</span>
            <Rating attributes={attributes} />
            <span className="review-desc">{item.description}</span>
          </div>
        </div>
      ))}
    </>
  );
};

const Considerations = (props) => {
  const { attributes } = props;

  return (
    <>
      <Pros attributes={attributes} />
      <Cons attributes={attributes} />
    </>
  );
};

const Pros = (props) => {
  const { attributes } = props;
  const { pros } = attributes;

  return (
    <>
      <h3>Pros</h3>
      <div className="review-right-pros">
        {pros.map((item, index) => (
          <div key={index} className="review-right-pros-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z"></path>
            </svg>
            <p aria-label="Why do you like the product?">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const Cons = (props) => {
  const { attributes } = props;
  const { cons } = attributes;
  // console.log(cons);
  return (
    <>
      <div className="review-right-pros">
        <h3>Cons</h3>
        {cons.map((item, index) => (
          <div key={index} className="review-right-pros-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
            </svg>
            <p aria-label="Why do you like the product?">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};
