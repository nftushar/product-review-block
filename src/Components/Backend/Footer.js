import React from "react";

function Footer(props) {
  const { attributes } = props;
  const { buttons, product, labels } = attributes;
  const { labelButtons } = labels
  const { subHeSize } = product;

  return <div className='productFooter'>
    {React.createElement(subHeSize, null, labelButtons)}
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
