import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { solidStar, outlineStar } from "./utils/icons";
import produce from "immer";
import {
  PanelBody,
  TabPanel,
  SelectControl,
  RangeControl,
  TextControl,
} from "@wordpress/components";

import {
  BColor,
  BtnGroup,
  MultiShadowControl,
  Typography,
} from "../../Components";

const iconOptions = [
  { label: __("Solid", "rating"), value: "solid", icon: solidStar },
  { label: __("Outline", "rating"), value: "outline", icon: outlineStar },
];

// function updateReview(index, property, value) {
//   const newReviews = [...reviews];
//   newReviews[index][property] = value;
//   setAttributes({ reviews: newReviews });
// }

const Settings = ({ attributes, setAttributes, updateReview }) => {
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
  const { attributes, setAttributes, updateReview } = props;

  // console.log(updateReview);

  const { rating, ratings } = attributes;

  const { scale, style } = rating;

  // Create a map function for ratings

  // Populate the map with ratings data
  // ratings.map((value)=>{
  //  console.log(value)
  // });

  // ratings.map(getAllData);

  // function getAllData(item) {
  //   return [item.title, item.rating, item.description].join(" ");
  // }

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
        {/* 
        <RangeControl
          className="mt20"
          label={__("Rating", "product-review")}
          labelPosition="left"
          value={rating}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, scale: val } })
          }
          min={1}
          max={scale}
          step={0.1}
        /> */}
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

      <PanelBody
        className="bPlPanelBody"
        title={__("Products Rating", "product-review")}
      >
        {/* {ratings.map((value) => {
          const { title, rating, description } = value;
          return (
            <>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__("Product Rating", "product-review")}
              >
                <RangeControl
                  className="mt20"
                  label={__("Rating", "product-review")}
                  labelPosition="left"
                  value={rating}
                  onChange={(val) => setAttributes({ rating: val })}
                  min={1}
                  max={scale}
                  step={0.1}
                />
                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={title}
                  onChange={(val) => setAttributes({ title: val })}
                />

                <TextControl
                  className="mt20"
                  label={__("Add Description", "product-review")}
                  value={description}
                  onChange={(val) => setAttributes({ description: val })}
                />
              </PanelBody>
            </>
          );
        })} */}

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
