import React from "react";

function Footer(props) {
  const { attributes } = props;
  const { buttons, labels, layout } = attributes;
  const { labelButtons } = labels
  const { subHeadingTag } = layout;

  return <div className='productFooter'>
    {React.createElement(subHeadingTag, { className: 'footerMessage' }, labelButtons)}
    <div className="footerButtons">
      {buttons.map((item, index) => (
        <a key={index} aria-multiline="true" aria-label="Button label" href={item.link} >
          {item.text}
        </a>
      ))}
    </div>
  </div>;
}

export default Footer;
