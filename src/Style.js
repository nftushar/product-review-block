import { getMultiShadowCSS, getTypoCSS, getColorsCSS, getBackgroundCSS } from "../../Components/utils/getCSS";
import { getArrFromNum, getDeviceFontSizeCSS } from "./utils/functions";

const Style = ({ attributes, clientId }) => {
	const { ratings, rating, gap, alignment, textTypo, textColor, textShadow, background, colors, layout, border } = attributes;
	const { width, color, borderStyle, radius, } = border;
	const { fontSize } = textTypo;
	const { button, buttonHov } = colors;
	const { fillColor, emptyColor } = rating;

	const mainSl = `#productReviews-${clientId}`;
	const ratingSl = `${mainSl} .productReviews`;
	const buttonSl = `${ratingSl} .footerButtons a`;
	const headerSl = `${mainSl} .productHeader`;
	const headerSlAfter = `${headerSl}:after`;
	const productDesc = `${headerSl} .productImgDesc`;
	const headerDesc = `${headerSl} .productImgDesc p`;
	const bodySl = `${mainSl} .productBody`;
	const reviewRight = `${bodySl} .review-right`;
	const reviewDec = `${ratingSl} .review-left .review-left-content`;
	const prosCons = `${ratingSl} .review-right .review-right-pros .review-right-pros-item p`;
	const footerSl = `${mainSl} .productFooter`;
	const footerSlAfter = `${mainSl} .productFooter:after`;
	const starFillSl = `${mainSl} .ratting .stars .star .starFill svg`;
	const emptyFillSI = `${mainSl} .ratting .stars .star svg`;

	// .wp-block-b-blocks-product-review .productReviews .productFooter:after
	// Average Ratting
	const totalRatings = ratings.reduce((previous, { rating }) => previous + rating, 0);
	const ratingAverage = ratings?.length ? (totalRatings / ratings?.length).toFixed(1) : 0;
	const starSl = `${headerSl} .headerMiddle .star`;
	const intAndDec = (ratingAverage + '').split('.');
	const ratingInt = parseInt(intAndDec[0]);
	const ratingDec = parseInt(intAndDec[1] || 0);
	const averageRatingsCSS = `${getArrFromNum(ratingInt).map((index) => `${starSl}:nth-child(${index}) .starFill`).join(', ')}{
			width: 100%;
		}
		${starSl}:nth-child(${ratingInt + 1}) .starFill{
			width: ${(() => {
			switch (ratingDec) {
				case 1:
					return 25;
				case 2:
					return 30;
				case 3:
					return 35;
				case 4:
					return 42.5;
				case 5:
					return 50;
				case 6:
					return 57.5;
				case 7:
					return 65;
				case 8:
					return 70;
				case 9:
					return 75;
				default:
					return 0
			}
		})()}%;
		}`;
	// All Ratings
	const ratingsCSS = ratings.map((r, index) => {
		const { rating } = r;

		const starSl = `${bodySl} #reviewRatings-${index + 1} .star`;
		const intAndDec = (rating + "").split(".");
		const ratingInt = parseInt(intAndDec[0]);

		return `${getArrFromNum(ratingInt).map((index) => `${starSl}:nth-child(${index}) .starFill`).join(", ")}{
			width: 100%;
		}`;
	}).join(" ");

	return <style dangerouslySetInnerHTML={{
		__html: `

		${getDeviceFontSizeCSS(`${headerDesc}, ${reviewDec}, ${prosCons}`, fontSize)}

		${headerSlAfter}{
			border-bottom: ${width} ${borderStyle} ${color}; 
		}

		${starFillSl}{
			fill: ${fillColor};
		}
		${emptyFillSI}{
			fill: ${emptyColor};
		}
		${averageRatingsCSS}
		${ratingsCSS}
 
		${ratingSl}{
            ${getBackgroundCSS(background)};
			border: ${width} ${borderStyle} ${color};
			border-radius: ${radius};
        }
		${buttonSl}{
			${getColorsCSS(button)}; 
		}
		${buttonSl}:hover {
            ${getColorsCSS(buttonHov)};
        }
		${reviewRight}{
			border-left: ${width} ${borderStyle} ${color}; 
		}
		${footerSlAfter}{
			border-bottom: ${width} ${borderStyle} ${color}; 

		}
	`}} />;
};
export default Style;


// var str = "Hello Bangladesh";  var savedStr = str.split(" ") .map(function(world){
//     return world.split("").reverse().join("") }) console.log(savedStr.join(" "));  