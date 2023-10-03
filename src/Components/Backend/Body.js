import React from "react";
import Rating from "./Rating";
import { RichText } from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
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
        );
      })}
    </div>
  );
};


const Cons = (props) => {
  const { attributes, updateArray } = props;
  const { cons, labels, layout } = attributes;
  const { subHeadingTag } = layout;


  const { labelCons } = labels;

  return <>
    <div className="review-right-pros">
      {React.createElement(subHeadingTag, null, labelCons)}
      {cons.map((item, index) => {
        const { text } = item;

        return <div key={index} className="review-right-pros-item">
          {mainConsIcon}
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
