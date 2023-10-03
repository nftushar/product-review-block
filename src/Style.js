import { getMultiShadowCSS, getTypoCSS, getColorsCSS, getBackgroundCSS } from "../../Components/utils/getCSS";
import { getArrFromNum } from "./utils/functions";

const Style = ({ attributes, clientId }) => {
	const { ratings, rating, gap, alignment, textTypo, textColor, textShadow, background, colors, contentSize, layout } = attributes;
	const { button, buttonHov } = colors;

	const mainSl = `#productReviews-${clientId}`;
	const ratingSl = `${mainSl} .productReviews`;
	const buttonSl = `${ratingSl} .review-footer-button a`;
	const headerSl = `${mainSl} .productHeader`;
	const headerDesc = `${headerSl} .productImgDesc p`;
	const bodySl = `${mainSl} .productBody`;
	const reviewDec = `${ratingSl} .review-left .review-left-content`;
	const prosCons = `${ratingSl} .review-right .review-right-pros .review-right-pros-item p`;
	const footerSl = `${mainSl} .productFooter`;




	// Average Ratting
	const totalRatings = ratings.reduce((previous, { rating }) => previous + rating, 0);
	const ratingAverage = ratings?.length ? (totalRatings / ratings?.length).toFixed(1) : 0;
	const starSl = `${headerSl} .headerMiddle .star`;
	const intAndDec = (ratingAverage + '').split('.');
	const ratingInt = parseInt(intAndDec[0]);
	const ratingDec = parseInt(intAndDec[1] || 0);
	const averageRatingsCSS = `
		${getArrFromNum(ratingInt).map((index) => `${starSl}:nth-child(${index}) .starFill`).join(', ')}{
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
		 
		${headerDesc}{
			font-size: ${contentSize}px;
		} 
		${reviewDec}{
			font-size: ${contentSize}px;
		}
		${prosCons}{
			font-size: ${contentSize}px;
		}
		${averageRatingsCSS}
		${ratingsCSS}
 
		${ratingSl} {
            ${getBackgroundCSS(background)} 
        }
		${buttonSl}{
			${getColorsCSS(button)}; 
		}
		${buttonSl}:hover {
            ${getColorsCSS(buttonHov)}
        }


	`}} />;
};
export default Style;
