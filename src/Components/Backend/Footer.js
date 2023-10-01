import React from "react";

function Footer(props) {
  const { attributes } = props;
  const { buttons } = attributes;

  return <div className='productFooter'>
    <h3>Buy this Product</h3>
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
