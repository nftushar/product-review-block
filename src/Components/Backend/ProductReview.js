import React from "react";  
import Header from "../Backend/Header";
import Body from "../Backend/Body";
import Footer from "../Backend/Footer";

function ProductReview({ attributes, updateReview }) {
  return (
    <div className="main"> 
      <Header attributes={attributes} /> 
      <Body attributes={attributes} updateReview={updateReview} />
      <div className="review-footer">
        <Footer attributes={attributes} />
      </div>
    </div>
  );
}

export default ProductReview;
