import React from "react";
import Header from "../Frontend/Header";
import Body from "../Frontend/Body";
import Footer from "../Frontend/Footer";

function ProductReview(props) {
  return <div className="productReviews">
    <Header {...props} />

    <Body {...props} />

    <Footer {...props} />
  </div>;
}

export default ProductReview;
