import React from "react";

function Footer(props) {
  const { attributes } = props;
  const { buttons, labels, layout } = attributes;
  const { labelButtons } = labels
  const { subHeadingTag } = layout;

  return <div className='productFooter'>
    {React.createElement(subHeadingTag, null, labelButtons)}
    <div className="review-footer-button">
      {buttons.map((item, index) => (
        <div key={index} className="review-footer-button">
          <a aria-multiline="true" aria-label="Button label" key={index} href={item.link} >
            {item.text}
          </a>
        </div>
      ))}
    </div>
  </div>;
}

export default Footer;
