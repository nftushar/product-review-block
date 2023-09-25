import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { solidStar, outlineStar } from "./utils/icons";
import produce from "immer";
import { PanelBody, TabPanel, SelectControl, RangeControl, TextControl } from "@wordpress/components";

import { BColor, BtnGroup, MultiShadowControl, Typography } from "../../Components";
import { PanelRow } from '@wordpress/components';
import { Button } from '@wordpress/components';

const iconOptions = [
  { label: __("Solid", "rating"), value: "solid", icon: solidStar },
  { label: __("Outline", "rating"), value: "outline", icon: outlineStar },
];

// const onAddReating = () => {
//   const newCards = [
//     ...ratings,
//     {
//       background: ratings?.[0]?.background || {
//         color: '#fff'
//       },
//       img: "",
//       title: `Title of the ${ratings?.length + 1} number card`,
//       desc: `Description of the ${ratings?.length + 1} number card`,
//       btnLabal: ratings?.[0]?.btnLabal || 'Button',
//       btnUrl: "#",
//     }
//   ];
//   setAttributes({ cards: newCards });
// };


// const onDuplicateReview = (e, index) => {
//   e.preventDefault();
//   const newReviews = [...reviews];
//   newReviews.splice(index, 0, reviews[index]);
//   setAttributes({ reviews: newReviews });
// };

const Settings = ({ attributes, setAttributes, updateReview, reviewDelete, onAddReview, updatePros, onAddPros, prosDelete, updateCons, onAddCons, consDelete, updateButton, onAddButton, buttonDelete }) => {
  // const { rating, textTypo, textColor, textShadow } = attributes;
  // const { scale, style, emptyColor, fillColor } = rating;

  return (
    <InspectorControls>
      <TabPanel
        className="bPlTabPanel"
        tabs={[
          { name: "general", title: __("General") },
          { name: "style", title: __("Style") },
        ]}
      >
        {(tab) => (
          <>
            {tab.name === "general" && (
              <General
                attributes={attributes}
                setAttributes={setAttributes}

                updateReview={updateReview}
                reviewDelete={reviewDelete}
                onAddReview={onAddReview}

                updatePros={updatePros}
                onAddPros={onAddPros}
                prosDelete={prosDelete}

                updateCons={updateCons}
                onAddCons={onAddCons}
                consDelete={consDelete}

                updateButton={updateButton}
                onAddButton={onAddButton}
                buttonDelete={buttonDelete}

              />
            )}

            {tab.name === "style" && (
              <Style
                attributes={attributes}
                setAttributes={setAttributes}
                updateReview={updateReview}
              />
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls>
  );
};

export default Settings;

const General = (props) => {
  const { attributes, setAttributes, updatePros, prosDelete, onAddPros, updateCons, consDelete, onAddCons,
    updateButton, onAddButton, buttonDelete, updateReview, reviewDelete, onAddReview } = props;
 

  const { rating, ratings, pros, cons, buttons } = attributes;

  const { scale, style } = rating;
  // const { text, link } = button;

  return (
    // General section start
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Settings", "product-review")}
      >
        <SelectControl
          label="Rating Scale"
          labelPosition="left"
          value={scale}
          options={[
            { label: "0-5", value: 5 },
            { label: "0-10", value: 10 },
          ]}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, scale: val } })
          }
        />
        <BtnGroup
          className="mt20"
          label={__("Icon Style", "product-review")}
          value={style}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, style: val } })
          }
          options={iconOptions}
          isIcon={true}
        />
      </PanelBody>

      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Products Ratings", "product-review")}
      >
        {ratings.map((val, index) => {
          const { title, rating, description } = val;

          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Product Rating ${index + 1}`, "product-review")}
              >
                <RangeControl
                  className="mt20"
                  label={__("Rating", "product-review")}
                  labelPosition="left"
                  value={rating}
                  onChange={(val) => updateReview(index, "rating", val)}

                  max={scale >= 10 ? scale : 5}
                />
                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={title}
                  onChange={(val) => updateReview(index, "title", val)}
                />

                <TextControl
                  className="mt20"
                  label={__("Add Description", "product-review")}
                  value={description}
                  onChange={(val) => updateReview(index, "description", val)}
                />

                <PanelRow className="itemAction mt20">
                  {1 < ratings?.length && <Button className="removeItem" onClick={() => reviewDelete(index)}>Delete</Button>}
                  <Button className="duplicateItem" onClick={(e) => onAddReview(e, index)}>
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>


      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Pros", "product-review")}
      >
        {pros.map((val, index) => {
          const { text } = val;

          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Pros ${index + 1}`, "Pros")}
              >
                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={text}
                  onChange={(val) => updatePros(index, "text", val)}
                />

                <PanelRow className="itemAction mt20">
                  {1 < pros?.length && <Button className="removeItem" onClick={() => prosDelete(index)}>Delete</Button>}
                  <Button className="duplicateItem" onClick={(e) => onAddPros(e, index)}>
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>

      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Cons", "product-review")}
      >
        {cons.map((val, index) => {
          const { text } = val;

          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Cons ${index + 1}`, "Cons")}
              >
                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={text}
                  onChange={(val) => updateCons(index, "text", val)}
                />

                <PanelRow className="itemAction mt20">
                  {1 < cons?.length && <Button className="removeItem" onClick={() => consDelete(index)}>Delete</Button>}
                  <Button className="duplicateItem" onClick={(e) => onAddCons(e, index)}>
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>




      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Buttons", "product-review")} >
        {buttons.map((val, index) => {
          const { text, link } = val;
          // console.log(link);
          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Button ${index + 1}`, "product-review")}
              >
                <TextControl
                  className="mt20"
                  label={__("Button Label", "product-review")}
                  value={text}
                  onChange={(val) => updateButton(index, "text", val)}
                />
                <TextControl
                  className="mt20"
                  label={__("Add link", "product-review")}
                  value={link}
                  onChange={(val) => updateButton(index, "link", val)}
                />
                <PanelRow className="itemAction mt20">
                  {1 < buttons?.length && <Button className="removeItem" onClick={() => buttonDelete(index)}>Delete</Button>}
                  <Button className="duplicateItem" onClick={(e) => onAddButton(e, index)}>
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>
    </>
    // General section end
  );
};

const Style = (props) => {
  const { attributes, setAttributes } = props;
  const { rating, textTypo, textColor, textShadow } = attributes;
  const { emptyColor, fillColor } = rating;

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Title", "product-review")}>
        <BColor
          label={__("Text Color", "product-review")}
          value={textColor}
          onChange={(val) => setAttributes({ textColor: val })}
          defaultColor="#0000"
        />
        <BColor
          label={__("Fill Color", "product-review")}
          value={fillColor}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, fillColor: val } })
          }
          defaultColor="#fcce5100"
        />
        <BColor
          label={__("Empty Fill Color", "product-review")}
          value={emptyColor}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, emptyColor: val } })
          }
          defaultColor="#f0efef"
        />
        <Typography
          label={__("Text Typography", "product-review")}
          value={textTypo}
          onChange={(val) => setAttributes({ textTypo: val })}
          defaults={{ fontSize: 16 }}
          produce={produce}
        />

        <MultiShadowControl
          label={__("Text Shadow", "product-review")}
          value={textShadow}
          onChange={(val) => setAttributes({ textShadow: val })}
          type="text"
          produce={produce}
        />
      </PanelBody>
    </>
  );
};
