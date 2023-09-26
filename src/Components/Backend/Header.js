import React from "react";
import Rating from './Rating';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
// import { name } from 'browser-sync';
// import Rating from "../Components/Rating";

function Header({ attributes, setAttributes  }) {

// console.log(setAttributes);
  return (
    <div className="productHeader">
      <Highlight attributes={attributes} />
      <Details attributes={attributes} setAttributes={setAttributes} />
    </div>
  );
}
export default Header;

const Highlight = ({ attributes }) => {
  const { product } = attributes;
  const { name, price, salePrice } = product;
  return (
    <>
      <div className="review-header">
        <h1 className="review-heading">{name}</h1>
        <div className="header-rating">
          <div className="rating-comp">
            <Rating attributes={attributes} />
          </div>
          <span className="dist-price">
            <del>${price}</del> ${salePrice}
          </span>
        </div>
      </div>
      </>
  );
};

const Details = ({  attributes, setAttributes }) => {
// console.log(setAttributes);
  
  const { product } = attributes;
  const {  image, description } = product; 
  return (
    <div className="review-header-content">
      <div className="image">
      <img src={image} />  
      </div>
      <div className="desc">
      <RichText
              tagName="p"
              value={description} 
              onChange={(val) => setAttributes({ product: { ...product, description: val } })} 
              placeholder={__("Enter Description", "product-review")}
              inlineToolbar
              allowedFormats={["core/bold", "core/italic"]}
            />
        {/* <p>{description}</p> */}
      </div>
    </div>
  );
};
