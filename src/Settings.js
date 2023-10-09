import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { solidStar, outlineStar } from "./utils/icons";
import produce from "immer";
import { PanelBody, TabPanel, SelectControl, RangeControl, TextControl, Button, PanelRow, TextareaControl, __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl } from "@wordpress/components";

import { BColor, BtnGroup, MultiShadowControl, Typography, InlineMediaUpload, Background, ColorsControl, Label, BDevice, BorderControl } from "../../Components";
import { borderStyles, emUnit, perUnit, pxUnit, remUnit } from '../../Components/utils/options';

const iconOptions = [
  { label: __("Solid", "rating"), value: "solid", icon: solidStar },
  { label: __("Outline", "rating"), value: "outline", icon: outlineStar },
];

const Settings = ({ attributes, setAttributes, updateArray, updateObject, reviewDelete, onAddReview, onAddPros, prosDelete, onAddCons, consDelete, onAddButton, buttonDelete }) => {
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

  return (
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
            const newRatings = produce(ratings, (draft) => {
              draft.map((__, index) => {
                const value =
                  5 === parseInt(val) ? Math.ceil(__.rating / 2) : __.rating * 2;

                draft[index]["rating"] = value;
              });
            });

            setAttributes({
              rating: { ...rating, scale: val },
              ratings: newRatings,
            });
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

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={__("Products Details", "product-review")}
      >
        <Label>Add Name</Label>
        <TextControl
          isShiftStepEnabled={true}
          value={name}
          onChange={(val) => setAttributes({ product: { ...product, name: val } })}
        />
        <InlineMediaUpload
          isShiftStepEnabled={true}
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

        <Label>Add currency</Label>
        <TextControl
          isShiftStepEnabled={true}
          value={currency}
          onChange={(val) => setAttributes({ product: { ...product, currency: val } })}
        />

        <Label>Add Description</Label>
        <TextareaControl
          value={description}
          onChange={(val) => setAttributes({ product: { ...product, description: val } })}
        />
      </PanelBody>

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={__("Products Ratings", "product-review")}
      >
        {ratings.map((ratings, index) => {
          const { title, rating, description } = ratings;

          return (
            <div key={index}>
              <PanelBody
                initialOpen={false}
                className="bPlPanelBody"
                title={__(`Product Rating ${index + 1}`, "product-review")}
              >
                <Label>Add Rating</Label>
                <RangeControl
                  className="mt20"
                  label={__("Rating", "product-review")}
                  labelPosition="left"
                  value={rating}
                  onChange={(val) => updateArray("ratings", index, "rating", val)}
                  max={scale >= 10 ? scale : 5}
                />

                <Label>Add Title</Label>
                <TextControl
                  className="mt20"
                  value={title}
                  onChange={(val) => updateArray("ratings", index, "title", val)}
                />

                <Label>Add Description</Label>
                <TextareaControl
                  className="mt20"
                  value={description}
                  onChange={(val) => updateArray("ratings", index, "description", val)}
                />
                <PanelRow className="itemAction mt20">
                  {1 < pros?.length && (
                    <Button className="removeItem" onClick={() => reviewDelete(index)}>
                      Delete
                    </Button>
                  )}
                  <Button
                    className="duplicateItem"
                    onClick={(e) => onAddReview(e, index)}
                  >
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={__("Labels", "product-review")}
      >

        <Label>Pros Labels</Label>
        <TextControl
          className="mt20"
          value={labelPros}
          onChange={(val) => setAttributes({ labels: { ...labels, labelPros: val } })}
        />

        <Label>Cons Labels</Label>
        <TextControl
          className="mt20"
          value={labelCons}
          onChange={(val) => setAttributes({ labels: { ...labels, labelCons: val } })}
        />

        <Label>Buttons Labels</Label>
        <TextControl
          className="mt20" 
          value={labelButtons}
          onChange={(val) => setAttributes({ labels: { ...labels, labelButtons: val } })}
        />
      </PanelBody>
       
      <PanelBody
        initialOpen={false}
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
                  {1 < pros?.length && (
                    <Button className="removeItem" onClick={() => prosDelete(index)}>
                      Delete
                    </Button>
                  )}
                  <Button
                    className="duplicateItem"
                    onClick={(e) => onAddPros(e, index)}
                  >
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>

      <PanelBody
        initialOpen={false}
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
                  onChange={(val) => updateArray("cons", index, "text", val)}
                />
                <PanelRow className="itemAction mt20">
                  {1 < cons?.length && (
                    <Button className="removeItem" onClick={() => consDelete(index)}>
                      Delete
                    </Button>
                  )}
                  <Button
                    className="duplicateItem"
                    onClick={(e) => onAddCons(e, index)}
                  >
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={__("Buttons", "product-review")}
      >
        {buttons.map((val, index) => {
          const { text, link } = val;
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
                  onChange={(val) => updateArray("buttons", index, "text", val)}
                />
                <TextControl
                  className="mt20"
                  label={__("Add link", "product-review")}
                  value={link}
                  onChange={(val) => updateArray("buttons", index, "link", val)}
                />
                <PanelRow className="itemAction mt20">
                  {1 < buttons?.length && (
                    <Button className="removeItem" onClick={() => buttonDelete(index)}>
                      Delete
                    </Button>
                  )}
                  <Button
                    className="duplicateItem"
                    onClick={(e) => onAddButton(e, index)}
                  >
                    Duplicate
                  </Button>
                </PanelRow>
              </PanelBody>
            </div>
          );
        })}
      </PanelBody>
    </>
  );
};

const Style = (props) => {
  const { attributes, setAttributes, updateObject } = props;
  const { rating, textTypo, textColor, textShadow, background, colors, product, layout, border } = attributes;
  const { width, radius, borderStyle, color } = border;
  const { headingTag, subHeadingTag } = layout;
  const { fontSize } = textTypo;
  const defTextTypoFS = { desktop: 16, tablet: 15, mobile: 14 };

  const [device, setDevice] = useState('desktop');

  const { nameSize, subHeSize } = product;
  const { emptyColor, fillColor } = rating;
  const { button, buttonHov } = colors;

  return (
    <>
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

        <PanelRow className='mt20'>
          <Label className=''>{__('Content Font Size:', 'product-review')}</Label>
          <BDevice device={device} onChange={val => setDevice(val)} />
        </PanelRow>

        <RangeControl className='mt0' value={fontSize[device]} onChange={val => updateObject('textTypo', 'fontSize', val, device)} min={0} max={120} step={1} allowReset={true} resetFallbackValue={defTextTypoFS[device]} initialPosition={defTextTypoFS[device]} />
      </PanelBody>

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={__("Border", "product-review")} >

        <UnitControl label={__('Width:', 'product-review')} labelPosition='left' value={width} onChange={val => updateObject('border', 'width', val)} units={[pxUnit(), emUnit()]} />

        <PanelRow className='mt20'>
          <Label className=''>{__('Style:', 'product-review')}</Label>
          <SelectControl value={borderStyle} onChange={val => updateObject('border', 'borderStyle', val)} options={borderStyles} />
        </PanelRow>

        <BColor className='mt20' label={__('Color:', 'product-review')} value={color} onChange={val => updateObject('border', 'color', val)} defaultColor='#000' />

        <UnitControl className='mt20' label={__('Radius:', 'product-review')} labelPosition='left' value={radius} onChange={val => updateObject('border', 'radius', val)} units={[pxUnit(50), perUnit(50), emUnit(3), remUnit(3)]} isResetValueOnUnitChange={true} />

      </PanelBody>


      <PanelBody initialOpen={false} className="bPlPanelBody" title={__("Colors", "product-review")}>
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
        <Background
          label={__("Background", "product-review")}
          value={background}
          onChange={(val) =>
            setAttributes({ background: val })
          }
        />

        <ColorsControl
          className="mt20"
          label={__("Button Colors", "product-review")}
          value={button}
          onChange={(val) =>
            setAttributes({ colors: { ...colors, button: val } })
          }
        />
        <ColorsControl
          label={__("Button Hover Colors", "product-review")}
          value={buttonHov}
          onChange={(val) => setAttributes({ colors: { ...colors, buttonHov: val } })}
        />
      </PanelBody>
    </>
  );
}; 