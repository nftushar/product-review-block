import React from "react";
import Header from "../Frontend/Header";
import Body from "../Frontend/Body";
import Footer from "../Frontend/Footer";

function ProductReview(props) {
  // console.log(props);
  return <div className="productReviews">
    <Header {...props} />

    <Body {...props} />

    <div className="review-footer">
      <Footer {...props} />
    </div>
  </div>;
}

export default ProductReview;
