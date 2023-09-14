import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { solidStar, outlineStar } from "./utils/icons";
import produce from "immer";
import { PanelBody, TabPanel, SelectControl } from "@wordpress/components";

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

const Settings = ({ attributes, setAttributes }) => {
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
              // <PanelBody
              //   className="bPlPanelBody"
              //   title={__("Settings", "star-rating")}
              // >
              //   <SelectControl
              //     label="Rating Scale"
              //     labelPosition="left"
              //     value={scale}
              //     options={[
              //       { label: "0-5", value: 5 },
              //       { label: "0-10", value: 10 },
              //     ]}
              //     onChange={(val) =>
              //       setAttributes({ rating: { ...rating, scale: val } })
              //     }
              //   />
              //   <BtnGroup
              //     className="mt20"
              //     label={__("Icon Style", "star-rating")}
              //     value={style}
              //     onChange={(val) =>
              //       setAttributes({ rating: { ...rating, style: val } })
              //     }
              //     options={iconOptions}
              //     isIcon={true}
              //   />
              // </PanelBody>
              <General attributes={attributes} setAttributes={setAttributes} />
            )}

            {tab.name === "style" && (
              // <PanelBody
              //   className="bPlPanelBody"
              //   title={__("Title", "star-rating")}
              // >
              //   <BColor
              //     label={__("Text Color", "star-rating")}
              //     value={textColor}
              //     onChange={(val) => setAttributes({ textColor: val })}
              //     defaultColor="#0000"
              //   />
              //   <BColor
              //     label={__("Fill Color", "star-rating")}
              //     value={fillColor}
              //     onChange={(val) =>
              //       setAttributes({ rating: { ...rating, fillColor: val } })
              //     }
              //     defaultColor="#fcce5100"
              //   />
              //   <BColor
              //     label={__("Empty Fill Color", "star-rating")}
              //     value={emptyColor}
              //     onChange={(val) =>
              //       setAttributes({ rating: { ...rating, emptyColor: val } })
              //     }
              //     defaultColor="#f0efef"
              //   />
              //   <Typography
              //     label={__("Text Typography", "star-rating")}
              //     value={textTypo}
              //     onChange={(val) => setAttributes({ textTypo: val })}
              //     defaults={{ fontSize: 16 }}
              //     produce={produce}
              //   />

              //   <MultiShadowControl
              //     label={__("Text Shadow", "star-rating")}
              //     value={textShadow}
              //     onChange={(val) => setAttributes({ textShadow: val })}
              //     type="text"
              //     produce={produce}
              //   />
              // </PanelBody>

              <Style attributes={attributes} setAttributes={setAttributes} />
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls>
  );
};

export default Settings;


const General = (props) => {
  const { attributes, setAttributes } = props;
  // console.log(attributes);
  const { rating } = attributes;
  const { scale, style } = rating;

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Settings", "star-rating")}>
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
          label={__("Icon Style", "star-rating")}
          value={style}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, style: val } })
          }
          options={iconOptions}
          isIcon={true}
        />
      </PanelBody>
    </>
  );
};

const Style = (props) => {
  const { attributes, setAttributes } = props;
  const { rating, textTypo, textColor, textShadow } = attributes;
  const { emptyColor, fillColor } = rating;

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Title", "star-rating")}>
        <BColor
          label={__("Text Color", "star-rating")}
          value={textColor}
          onChange={(val) => setAttributes({ textColor: val })}
          defaultColor="#0000"
        />
        <BColor
          label={__("Fill Color", "star-rating")}
          value={fillColor}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, fillColor: val } })
          }
          defaultColor="#fcce5100"
        />
        <BColor
          label={__("Empty Fill Color", "star-rating")}
          value={emptyColor}
          onChange={(val) =>
            setAttributes({ rating: { ...rating, emptyColor: val } })
          }
          defaultColor="#f0efef"
        />
        <Typography
          label={__("Text Typography", "star-rating")}
          value={textTypo}
          onChange={(val) => setAttributes({ textTypo: val })}
          defaults={{ fontSize: 16 }}
          produce={produce}
        />

        <MultiShadowControl
          label={__("Text Shadow", "star-rating")}
          value={textShadow}
          onChange={(val) => setAttributes({ textShadow: val })}
          type="text"
          produce={produce}
        />
      </PanelBody>
    </>
  );
};
