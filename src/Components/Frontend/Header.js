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
  const { product } = attributes
  const { name, price, salePrice } = product;
  return (
    <div className="headerTop">
      <h1 className="productName">{name}</h1>
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
      <div className="image">
        <img src={image} />
      </div>
      <p className="headerDesc">{description}</p>
    </div>
  );
};
