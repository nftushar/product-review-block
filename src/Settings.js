import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { solidStar, outlineStar } from "./utils/icons";
import produce from "immer";
import { PanelBody, TabPanel, SelectControl, RangeControl, TextControl, Button, PanelRow, TextareaControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";

import { BColor, BtnGroup, MultiShadowControl, Typography, InlineMediaUpload, Background, ColorsControl, Label, BDevice } from "../../Components";
const iconOptions = [
  { label: __("Solid", "rating"), value: "solid", icon: solidStar },
  { label: __("Outline", "rating"), value: "outline", icon: outlineStar },
];

const Settings = ({ attributes, setAttributes, updateArray, updateObject, reviewDelete, onAddReview, onAddPros, prosDelete, onAddCons, consDelete, onAddButton, buttonDelete }) => {
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
                updateArray={updateArray}
                updateObject={updateObject}

                reviewDelete={reviewDelete}
                onAddReview={onAddReview}

                onAddPros={onAddPros}
                prosDelete={prosDelete}

                onAddCons={onAddCons}
                consDelete={consDelete}

                onAddButton={onAddButton}
                buttonDelete={buttonDelete}

              />
            )}

            {tab.name === "style" && (
              <Style
                attributes={attributes}
                setAttributes={setAttributes}
                updateArray={updateArray}
                updateObject={updateObject}
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
  const { attributes, setAttributes, prosDelete, onAddPros, consDelete, onAddCons, onAddButton, buttonDelete, updateArray, reviewDelete, onAddReview } = props;

  const { product, rating, ratings, labels, pros, cons, buttons } = attributes;
  const { name, price, salePrice, currency, description, image } = product;
  const { labelPros, labelCons, labelButtons } = labels;

  const { scale, style } = rating;

  // console.log(image);
  return (
    // General start
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
          onChange={(val) => {
            const newRatings = produce(ratings, draft => {
              draft.map((__, index) => {
                const value = 5 === parseInt(val) ? Math.ceil(__.rating / 2) : __.rating * 2;

                draft[index]['rating'] = value;
              });
            });

            setAttributes({ rating: { ...rating, scale: val }, ratings: newRatings });
          }}
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
        title={__("Products Details", "product-review")} >
        <TextControl
          label={__("Add Name", "product-review")}
          className="mt20"
          value={name}
          onChange={(val) => setAttributes({ product: { ...product, name: val } })}
        />
        <InlineMediaUpload
          label={__("Add Image", "product-review")}
          className="mt20"
          value={image}
          onChange={(val) => setAttributes({ product: { ...product, image: val } })}
        />
        <NumberControl
          className="mt20"
          isShiftStepEnabled={true}
          label={__("Add Price", "product-review")}
          value={price}
          onChange={(val) => setAttributes({ product: { ...product, price: val } })}
        />
        <NumberControl
          className="mt20"
          isShiftStepEnabled={true}
          label={__("Add Sale Price", "product-review")}
          value={salePrice}
          onChange={(val) => setAttributes({ product: { ...product, salePrice: val } })}
        />
        {/* shiftStep={10} */}
        <TextControl
          className="mt20"
          label={__("Add Currency", "product-review")}
          value={currency}
          onChange={(val) => setAttributes({ product: { ...product, currency: val } })}
        />
        <TextareaControl
          className="mt20"
          label={__("Add Description", "product-review")}
          value={description}
          onChange={(val) => setAttributes({ product: { ...product, description: val } })}
        />
      </PanelBody>

      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Products Ratings", "product-review")}>

        {ratings.map((ratings, index) => {
          const { title, rating, description } = ratings;

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
                  onChange={(val) => updateArray("ratings", index, "rating", val)}
                  max={scale >= 10 ? scale : 5}
                />
                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={title}
                  onChange={(val) => updateArray("ratings", index, "title", val)}
                />
                <TextareaControl
                  className="mt20"
                  label={__("Add Description", "product-review")}
                  value={description}
                  onChange={(val) => updateArray("ratings", index, "description", val)}
                />
                <PanelRow className="itemAction mt20">
                  {1 < pros?.length && <Button className="removeItem" onClick={() => reviewDelete(index)}>Delete</Button>}
                  <Button className="duplicateItem" onClick={(e) => onAddReview(e, index)}>
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>

      {/* Labels start */}
      <PanelBody initialOpen={false}
        className="bPlPanelBody"
        title={__("Labels", "product-review")}
      >
        <TextControl
          className="mt20"
          label={__("Pros Labels", "product-review")}
          value={labelPros}
          onChange={(val) => setAttributes({ labels: { ...labels, labelPros: val } })}
        />
        <TextControl
          className="mt20"
          label={__("Cons Labels", "product-review")}
          value={labelCons}
          onChange={(val) => setAttributes({ labels: { ...labels, labelCons: val } })}
        />
        <TextControl
          className="mt20"
          label={__("Buttons Labels", "product-review")}
          value={labelButtons}
          onChange={(val) => setAttributes({ labels: { ...labels, labelButtons: val } })}
        />
      </PanelBody>
      {/* Label end */}

      {/* Pros start */}
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
                  onChange={(val) => updateArray("pros", index, "text", val)}
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
      {/* Pros end */}

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
                title={__(`Cons ${index + 1}`, "Cons")} >

                <TextControl
                  className="mt20"
                  label={__("Add Title", "product-review")}
                  value={text}
                  onChange={(val) => updateArray("cons", index, "text", val)} />

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
          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Button ${index + 1}`, "product-review")}>

                <TextControl
                  className="mt20"
                  label={__("Button Label", "product-review")}
                  value={text}
                  onChange={(val) => updateArray("buttons", index, "text", val)} />

                <TextControl
                  className="mt20"
                  label={__("Add link", "product-review")}
                  value={link}
                  onChange={(val) => updateArray("buttons", index, "link", val)}

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
    // General end
  );
};

const Style = (props) => {
  const { attributes, setAttributes, updateObject } = props;
  const { rating, textTypo, textColor, textShadow, background, colors, product, layout } = attributes;
  const { headingTag, subHeadingTag } = layout;
  const { fontSize } = textTypo;
  const defTextTypoFS = { desktop: 16, tablet: 15, mobile: 14 }

  const [device, setDevice] = useState('desktop');

  const { nameSize, subHeSize } = product;
  const { emptyColor, fillColor } = rating;
  const { button, buttonHov } = colors;

  // Style start
  return <>
    <PanelBody className="bPlPanelBody" title={__("Title", "product-review")}>

      <PanelBody className="bPlPanelBody" title={__("Typography", "product-review")}>
        <SelectControl
          label="Main Heading"
          labelPosition="left"
          value={headingTag}
          options={[
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ]}
          onChange={(val) =>
            setAttributes({ layout: { ...layout, headingTag: val } })
          }
        />
        <SelectControl
          label="Sub Heading"
          labelPosition="left"
          value={subHeadingTag}
          options={[
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ]}
          onChange={(val) =>
            setAttributes({ layout: { ...layout, subHeadingTag: val } })
          }
        />

        <RangeControl
          className="mt20"
          label={__("Content Size", "product-review")}
          labelPosition="left"
          value={fontSize}
          onChange={(val) =>
            setAttributes({ textTypo: { ...textTypo, fontSize: val } })
          }
          min={8}
          max={25}
        />

        <PanelRow className='mt20'>
          <Label className=''>{__('Font Size:', 'bplugins')}</Label>
          <BDevice device={device} onChange={val => setDevice(val)} />
        </PanelRow>
        <RangeControl value={fontSize[device]} onChange={val => updateObject('textTypo', 'fontSize', val, device)} min={0} max={120} step={1} allowReset={true} resetFallbackValue={defTextTypoFS[device]} initialPosition={defTextTypoFS[device]} />

      </PanelBody>
      {/* <BColor
        label={__("Text Color", "product-review")}
        value={textColor}
        onChange={(val) => setAttributes({ textColor: val })}
        defaultColor="#0000"
      /> */}
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

      {/* <Typography
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
      /> */}

    </PanelBody>
    <PanelBody className="bPlPanelBody" title={__("Colors", "product-review")}>
      <Background
        label={__("Background", "product-review")}
        value={background}
        onChange={(val) =>
          setAttributes({ background: val })
        } />

      <ColorsControl
        className="mt20"
        label={__("Btn Colors", "product-review")}
        value={button}
        onChange={(val) =>
          setAttributes({ colors: { ...colors, button: val } })
        }
      />
      <ColorsControl
        label={__("btn Hover Colors", "product-review")}
        value={buttonHov}
        onChange={(val) => setAttributes({ colors: { ...colors, buttonHov: val } })}
      />
    </PanelBody>
  </>;
};
{/* // Style end */ }
