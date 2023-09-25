import { getArrFromNum } from "../../utils/functions";
import { solidStar, outlineStar } from "../../utils/icons";

const Rating = ({ attributes }) => {
  const { rating: { scale, style }, ratings } = attributes;
  // Calculate the weighted total rating
  const  weightedSum  = ratings.reduce((sum, item, index) => {
    const weightedRating = (item.rating * (index + 1)) / scale;
    return sum + weightedRating;
  }, 0);

  return (
    <div className="ratting">
      <div className="stars">
        {getArrFromNum(scale).map((index) => (
          <span key={index} className="star">
            {"solid" === style ? solidStar : outlineStar}
            <span className="starFill">{solidStar}</span>
          </span>
        ))}
      </div>
      <div className="rating-text">
        <span className="ratingPrefix">{weightedSum.toFixed(2)} out of {scale}</span>
      </div>
    </div>
  );
};

export default Rating;
