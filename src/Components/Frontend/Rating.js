import { getArrFromNum } from "../../utils/functions";
import { solidStar, outlineStar } from "../../utils/icons";

const Rating = ({ attributes, rating }) => {
  const { rating: { scale, style } } = attributes;
// console.log(rating);
  return (
    <div className="ratting">
      <div className="stars">
        {getArrFromNum(scale).map((index) => <span key={index} className="star">
          {"solid" === style ? solidStar : outlineStar}

          <span className="starFill">{solidStar}</span>
        </span>)}
      </div>

      <div className="rating-text">
        <span className="ratingPrefix">{rating} out h of {scale}</span>
      </div>
    </div >
  );
};

export default Rating;
