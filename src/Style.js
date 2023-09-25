import { getMultiShadowCSS, getTypoCSS } from "../../Components/utils/getCSS";
import { getArrFromNum } from "./utils/functions";

const Style = ({ attributes, clientId }) => {
	const { ratings, rating, gap, alignment, textTypo, textColor, textShadow } =
		attributes;

	const mainSl = `#reviewRatings-${clientId}`;
	const ratingSl = `#reviewRatings-${clientId} .ratting`;
	const starSl = `${ratingSl} .stars .star`;
	const intAndDec = (rating + "").split(".");
	const ratingInt = parseInt(intAndDec[0]);
	// const ratingDec = parseInt(intAndDec[1] || 0);

	return <style dangerouslySetInnerHTML={{
		__html: `
		${ratings.map((r, index) => {
			const { rating } = r;

			const starSl = `${mainSl} #productReviews-${index + 1} .stars .star`;
			const intAndDec = (rating + "").split(".");
			const ratingInt = parseInt(intAndDec[0]);

			return `${getArrFromNum(ratingInt).map((index) => `${starSl}:nth-child(${index}) .starFill`).join(", ")}{
				width: 100%;
			}`;
		}).join(" ")}
	`}} />;
};
export default Style;
