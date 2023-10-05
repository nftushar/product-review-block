import React from "react";
import Rating from './Rating';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

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
  const { attributes, setAttributes } = props;
  const { product, ratings, layout } = attributes
  const { name, price, salePrice } = product;
  const { headingTag } = layout;
  const totalRatings = ratings.reduce((previous, { rating }) => previous + rating, 0);
  const ratingAverage = ratings?.length ? (totalRatings / ratings?.length).toFixed(1) : 0;

  return <div className="headerTop">
    <RichText
      tagName={headingTag}
      value={name}
      className="productName"
      onChange={(val) => setAttributes({ product: { ...product, name: val } })}
      placeholder={__("Enter Product Name", "product-review")}
      inlineToolbar
      allowedFormats={["core/bold", "core/italic"]}
    />

    <div className="headerMiddle">
      <Rating attributes={attributes} rating={ratingAverage || 0} />

      <span className="productPrice">
        <del>${price}</del> ${salePrice}
      </span>
    </div>
  </div>;
};

const Details = (props) => {
  const { attributes, updateObject } = props;
  const { product } = attributes;
  const { image, description } = product;

  return (
    <div className="productImgDesc">
      {image &&
        <div className="image">
          <img src={image} />
        </div>
      }

      <RichText
        tagName="p"
        className="headerDesc"
        value={description}
        onChange={(val) => updateObject('product', 'description', val)}
        placeholder={__("Enter Description", "product-review")}
        inlineToolbar
        allowedFormats={["core/bold", "core/italic"]}
      />

    </div>
  );
};
