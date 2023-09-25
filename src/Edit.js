import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
import ProductReview from "./Components/ProductReview";

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;
  const { ratings, pros, cons, buttons } = attributes;


  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  function updateReview(index, property, value) {
    const newRatings = [...ratings];
    newRatings[index][property] = value;
    setAttributes({ ratings: newRatings });
  }


  function updatePros(index, property, value) {
    const newPros = [...pros];
    newPros[index][property] = value;
    setAttributes({ pros: newPros });
  }
  function prosDelete(index) {
    const newPros = [...pros];
    newPros.splice(index, 1);
    setAttributes({ pros: newPros });
  }
  const onAddPros = () => {
    const newPros = [...pros,
    {
      text: `Sturdy build and ergonomics`,
    }];
    setAttributes({ pros: newPros });
  };


  function updateCons(index, property, value) {
    const newCons = [...cons];
    newCons[index][property] = value;
    setAttributes({ cons: newCons });
  }
  function consDelete(index) {
    const newCons = [...cons];
    newCons.splice(index, 1);
    setAttributes({ cons: newCons });
  }
  const onAddCons = () => {
    // console.log(cons);
    const newCons = [...cons,
    {
      text: `Incompatible with old versions`,
    }];
    setAttributes({ cons: newCons });
  };






  function updateButton(index, property, value) {
    const newButtons = [...buttons];
    newButtons[index][property] = value;
    setAttributes({ buttons: newButtons });
  }


  function reviewDelete(index) {
    const newReviews = [...ratings];
    newReviews.splice(index, 1);
    setAttributes({ ratings: newReviews });
  }

  const onAddReview = () => {
    const newReviews = [...ratings,
    {
      title: `Title of the ${ratings?.length + 1} number review`,
      rating: 4,
      description: `Description of the ${ratings?.length + 1} number review`,
    }
    ];
    setAttributes({ ratings: newReviews });
  };




  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} updateReview={updateReview}
        updatePros={updatePros} onAddPros={onAddPros} prosDelete={prosDelete}
        updateCons={updateCons} onAddCons={onAddCons} consDelete={consDelete}
        updateButton={updateButton} reviewDelete={reviewDelete} onAddReview={onAddReview} />

      <div className={className} id={`reviewRatings-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <ProductReview attributes={attributes} updateReview={updateReview} />
      </div>
    </>
  );
};

export default Edit;
