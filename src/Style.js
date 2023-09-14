import { getMultiShadowCSS, getTypoCSS } from "../../Components/utils/getCSS";
import { getArrFromNum } from "./utils/functions";

const Style = ({ attributes, clientId }) => {
    const { rating, gap, alignment, textTypo, textColor, textShadow } = attributes;

    const ratingSl = `#reviewRatings-${clientId} .reviewRatings`;
    const starSl = `${ratingSl} .stars .star`;
    const intAndDec = (rating + '').split('.');
    const ratingInt = parseInt(intAndDec[0]);
    // const ratingDec = parseInt(intAndDec[1] || 0);
 
    return <style dangerouslySetInnerHTML={{
        __html: `
        ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${ratingSl} .ratingPrefix`, textTypo)?.styles}

          ${ratingSl} {
            justify-content: ${alignment};
            gap: ${gap};
            color: ${textColor}; 
          }

          ${ratingSl} .ratingPrefix{
            text-shadow: ${getMultiShadowCSS(textShadow, 'text')}
          }

        ${getArrFromNum(ratingInt).map((index) => `${starSl}:nth-child(${index}) .starFill`).join(', ')}{
            width: 100%;
        }

      
        }
    `}}
    />
}
export default Style;