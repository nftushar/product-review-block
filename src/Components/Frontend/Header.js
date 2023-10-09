import React from "react";
import Rating from "../../Components/Rating";

function Header(props) {
  return (
    <div className="productHeader">
      <Highlight {...props} />
      <Details {...props} />
    </div>
  );
}
export default Header;

const Highlight = ({ attributes }) => {
  const { product, ratings, layout } = attributes 
  const { name, price, salePrice, currency } = product;
  const { headingTag } = layout;
  const totalRatings = ratings.reduce((previous, { rating }) => previous + rating, 0);
  const ratingAverage = ratings?.length ? (totalRatings / ratings?.length).toFixed(1) : 0;

  return (
    <div className="headerTop">
      {React.createElement(headingTag, { className: 'productName' }, name)}
      <div className="headerMiddle">
      <Rating attributes={attributes} rating={ratingAverage || 0} />
        <span className="productPrice">
          <del>{currency}{price}</del> {currency}{salePrice}
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
