import React from "react";
import Header from "../Backend/Header";
import Body from "../Backend/Body";
import Footer from "../Backend/Footer";

function ProductReview(props) {
  return <div className="productReviews">
    <Header {...props} />

    <Body {...props} />

    <div className="review-footer">
      <Footer {...props} />
    </div>
  </div>;
}

export default ProductReview;
