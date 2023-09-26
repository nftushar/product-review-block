import React from "react";
import Rating from './Rating';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
// import { name } from 'browser-sync';
// import Rating from "../Components/Rating";

function Header(props) {
  return (
    <div className="productHeader">
      <Highlight {...props} />
      <Details {...props} />
    </div>
  );
}
export default Header;

const Highlight = (props) => {
  const { product } = props.attributes;
  const { name, price, salePrice } = product;
  return (
    <>
      <div className="review-header">
        <h1 className="review-heading">{name}</h1>
        <div className="header-rating">
          <div className="rating-comp">
            <Rating {...props} />
          </div>
          <span className="dist-price">
            <del>${price}</del> ${salePrice}
          </span>
        </div>
      </div>
    </>
  );
};

const Details = (props) => {
  const { attributes, updateObject } = props;
  const { product } = attributes;
  const { image, description } = product;

  return (
    <div className="review-header-content">
      <div className="image">
        <img src={image} />
      </div>
      <div className="desc">
        <RichText
          tagName="p"
          value={description}
          onChange={(val) => updateObject('product', 'description', val)}
          placeholder={__("Enter Description", "product-review")}
          inlineToolbar
          allowedFormats={["core/bold", "core/italic"]}
        />
        {/* <p>{description}</p> */}
      </div>
    </div>
  );
};
