import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import ProductReview from "./Components/ProductReview";

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;
  const { ratings } = attributes;

  // console.log( ratings);

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  function updateReview(index, property, value) {
    const newRatings = [...ratings];
    newRatings[index][property] = value;
    setAttributes({ cards: newRatings });
  }

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        updateReview={updateReview}
      />
      <div className={className} id={`reviewRatings-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <ProductReview attributes={attributes} updateReview={updateReview} />
      </div>
    </>
  );
};

export default Edit;
