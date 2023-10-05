import React from "react";
import Rating from "./Rating";
import { mainProsIcon, mainConsIcon } from "../../utils/icons";


function Body(props) {
  return <div className="productBody">
    <Reviews {...props} />
  </div>;
}

export default Body;

const Reviews = (props) => {
  return (
    <>
      <div className="review-left">
        <Review {...props} />
      </div>
      <div className="review-right">
        <Considerations {...props} />
      </div>
    </>
  );
};

const Review = (props) => {
  const { attributes } = props;
  const { ratings } = attributes; 
  return (
    <>
      {ratings.map((ratings, index) => {
        const { title, rating, description } = ratings;
        return <div
          key={index}
          className="review-left-features"
          id={`reviewRatings-${index + 1}`}
        >
          <div className="review-left-content">
            <span className="review-heading">{title}</span>
            <Rating attributes={attributes} rating={rating} />
            <span className="review-desc">{description}</span>
          </div>
        </div>
      })}
    </>
  )
};


const Considerations = (props) => {
  return <>
    <Pros {...props} />
    <Cons {...props} />
  </>;
};


const Pros = (props) => {
  const { attributes } = props;
  const { pros, labels, layout } = attributes;
  const { subHeadingTag } = layout;
  const { labelPros } = labels;


  return (
    <div className="review-right-pros">
      {React.createElement(subHeadingTag, null, labelPros)}
      {pros.map((item, index) => {
        const { text } = item;

        return (
          <div key={index} className="review-right-pros-item" id={`productReviews-${index + 1}`}>
            {mainProsIcon}
            <p className="review-desc"  >
              {text}
            </p>
          </div>
        );
      })}
    </div>

  );
};

const Cons = (props) => {
  const { attributes } = props;
  const { cons, labels, layout } = attributes;
  const { subHeadingTag } = layout;
  const { labelCons } = labels;

  return (
    <>
      <div className="review-right-pros">
        {React.createElement(subHeadingTag, null, labelCons)}
        {cons.map((item, index) => {
          const { text } = item;

          return (
            <div key={index} className="review-right-pros-item">
              {mainConsIcon}
              <p className="review-desc" >
                {text}
              </p>
            </div>
          );
        })}
      </div>

    </>
  );
};
