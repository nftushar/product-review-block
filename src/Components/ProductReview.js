import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function ProductReview({ attributes }) {
  return (
    // <h1>HEllo</h1>
    <div className="main">
      <Header attributes={attributes} />
      <Body attributes={attributes} />
      <div className="review-footer">
          <Footer attributes={attributes} />  
      </div>
    </div>
  );
}

export default ProductReview;
