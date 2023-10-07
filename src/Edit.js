import React, { useEffect } from "react";
import produce from 'immer';

import Settings from "./Settings";
import ProductReview from './Components/Backend/ProductReview';
import Style from './Style';
import Body from './Components/Backend/Body';

const Edit = (props) => {
  const { className, attributes, setAttributes, clientId } = props;
  const { ratings, pros, cons, buttons } = attributes;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  const updateArray = (array, index, property, value) => {
    const newArray = produce(attributes[array], draft => {
      draft[index][property] = value;
    });

    setAttributes({ [array]: newArray });
  }
  const updateObject = (object, property, value, childProp = false) => {
    const objectAttr = attributes[object];

    if (childProp !== false) {
      setAttributes({ [object]: { ...objectAttr, [property]: { ...objectAttr[property], [childProp]: value } } });
    } else {
      setAttributes({ [object]: { ...objectAttr, [property]: value } });
    }

  }

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

  const onAddButton = () => {
    const newButton = [...buttons,
    {
      text: `Buy on Amazon`,
      link: ` `,
    }];
    setAttributes({ buttons: newButton });
  }

  function buttonDelete(index) {
    const newButton = [...buttons];
    newButton.splice(index, 1);
    setAttributes({ buttons: newButton });
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

  const nestedProps = { attributes, setAttributes, updateArray, updateObject }

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes}
        updatePros={updatePros} onAddPros={onAddPros} prosDelete={prosDelete}
        updateCons={updateCons} onAddCons={onAddCons} consDelete={consDelete}
        updateButton={updateButton} onAddButton={onAddButton} buttonDelete={buttonDelete}
        updateReview={updateReview} reviewDelete={reviewDelete} onAddReview={onAddReview}
        updateArray={updateArray}
        updateObject={updateObject}
      />

      <div className={className} id={`productReviews-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />

        <ProductReview  {...nestedProps} />
      </div>
    </>
  );
};

export default Edit;
