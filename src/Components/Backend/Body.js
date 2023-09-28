import React from "react";
import Rating from "./Rating";
import { RichText } from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';

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
  const { attributes, updateArray } = props;
  const { ratings } = attributes;

  return <>
    {ratings.map((ratings, index) => {
      const { title, rating, description } = ratings;
      return <div
        key={index}
        className="review-left-features"
        id={`reviewRatings-${index + 1}`}
      >
        <div className="review-left-content">
          <RichText
            tagName="span"
            value={title}
            className="review-heading"
            onChange={(val) => updateArray("ratings", index, "title", val)}
            placeholder={__("Enter Title", "product-review")}
            inlineToolbar
            allowedFormats={["core/bold", "core/italic"]}
          />
          <Rating attributes={attributes} rating={rating} />
          <RichText
            tagName="span"
            value={description}
            className="review-desc"
            onChange={(val) => updateArray("ratings", index, "description", val)}
            placeholder={__("Enter Description", "product-review")}
            inlineToolbar
            allowedFormats={["core/bold", "core/italic"]}
          />
        </div>
      </div>
    })}
  </>
};

const Considerations = (props) => {
  return <>
    <Pros {...props} />
    <Cons {...props} />
  </>;
};

const Pros = (props) => {
  const { attributes, updateArray } = props;
  const { pros, labels } = attributes;
  const { labelPros } = labels;

  return <>
    <div className="review-right-pros">
    <h3>{labelPros}</h3>
      {pros.map((item, index) => {
        const { text } = item;

        return <div key={index} className="review-right-pros-item" id={`productReviews-${index + 1}`} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z"></path>
          </svg>

          <RichText
            tagName="p"
            value={text}
            className="review-desc"
            onChange={(content) => updateArray('pros', index, "text", content)}
            placeholder={__("Enter Pros Title", "product-review")}
            inlineToolbar
            allowedFormats={["core/bold", "core/italic"]}
          />
        </div>
      })}
    </div>
  </>
};

const Cons = (props) => {
  const { attributes, updateArray } = props;
  const { cons, labels } = attributes;
  const {  labelCons } = labels;

  return <>
    <div className="review-right-pros">
      <h3>{labelCons}</h3>
      {cons.map((item, index) => {
        const { text } = item;

        return <div key={index} className="review-right-pros-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path>
          </svg>
          <RichText
            tagName="p"
            value={text}
            className="review-desc"
            onChange={(content) => updateArray('cons', index, "text", content)}
            placeholder={__("Enter cons Title", "product-review")}
            inlineToolbar
            allowedFormats={["core/bold", "core/italic"]}
          />
        </div>
      })}
    </div>
  </>;
};
