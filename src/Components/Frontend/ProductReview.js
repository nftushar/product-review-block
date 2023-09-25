import React from "react";  
import Header from "../Backend/Header";
import Body from "../Backend/Body";
import Footer from "../Backend/Footer";

function ProductReview({ attributes }) {
  return (
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
