import React from "react";
import Rating from './Rating';
// import Style from '../../Style';
// import Rating from "../Components/Rating";

function Header({ attributes }) {
  return (
    <div className="productHeader">
      <Highlight attributes={attributes} />
      <Details attributes={attributes} />
    </div>
  );
}
export default Header;

const Highlight = ({ attributes }) => {
  const { product, layout } = attributes
  const { name, price, salePrice } = product;
  const { headingTag } = layout;

  return (
    <div className="headerTop">
      {React.createElement(headingTag, { className: 'productName' }, name)}
      <div className="headerMiddle">
        <Rating attributes={attributes} />
        <span className="productPrice">
          <del>{price}</del> ${salePrice}
        </span>
      </div>
    </div>
  );
};

const Details = (attributes) => {

  const { product } = attributes.attributes;
  const { image, description } = product;
  return (
    <div className="productImgDesc">
      {image &&
        <div className="image">
          <img src={image} />
        </div>}
      <p className="headerDesc">{description}</p>
    </div>
  );
};
