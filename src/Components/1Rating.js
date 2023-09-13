import { getArrFromNum } from "../utils/functions";
import { solidStar, outlineStar } from "../utils/icons";

const Rating = ({ attributes }) => {
  const { rating } = attributes;
  const { scale, style } = rating;
  // console.log(scale);
  return (
    <>
      <div className="reviewRatings">
        <div className="stars">
          {getArrFromNum(scale).map((index) => {
            return (
              <span key={index} className="star">
                {"solid" === style ? solidStar : outlineStar}
                <span className="starFill">{solidStar}</span>
              </span>
            );
          })}
        </div>
        <div className="rating-text">
          {/* <span className="ratingPrefix">{prefix}</span> */}
        </div>
      </div>
    </>
  );
};
export default Rating;
