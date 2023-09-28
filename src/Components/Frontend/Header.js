import React from "react";
import Rating from './Rating';
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
  return (
    <div className="review-header">
      <h1 className="review-heading">Shart</h1>
      <div className="header-rating">
        <div className="rating-comp">
          <Rating attributes={attributes} />
        </div>
        <span className="dist-price">
          <del>$20aa</del> $18aa
        </span>
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="productImgDesc">
      <div className="image">
        <img src="http://localhost/wordpress/wp-content/uploads/2023/09/zebra-1050446_1280-300x200.jpg" />
      </div>

      <p>hello this is a product description</p>

    </div>
  );
};
