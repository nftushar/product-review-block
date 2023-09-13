import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import ProductReview from "./Components/ProductReview";

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} />
      <div className={className} id={`reviewRatings-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <ProductReview attributes={attributes} />
      </div>
    </>
  );
};

export default Edit;
