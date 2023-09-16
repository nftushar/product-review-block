import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import ProductReview from "./Components/ProductReview";

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;
  const { ratings, buttons } = attributes;


  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  function updateReview(index, property, value) {
    const newRatings = [...ratings];
    newRatings[index][property] = value;
    setAttributes({ ratings: newRatings });
  }

  function updateButton(index, property, value) {
    const newButtons = [...buttons];
    newButtons[index][property] = value;
    setAttributes({ buttons: newButtons });
  }


  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} updateReview={updateReview} updateButton={updateButton} />
      <div className={className} id={`reviewRatings-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <ProductReview attributes={attributes} updateReview={updateReview} />
      </div>
    </>
  );
};

export default Edit;
