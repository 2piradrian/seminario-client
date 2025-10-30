import { Review } from "../../../../domain"
import ReviewItem from "../../molecules/review-item/review-item";
import style from "./style.module.css"
type Props = {
    reviews: Review[];
    onClickOnAvatar: (review: Review) => void;
}

export default function ReviewList({reviews, onClickOnAvatar}:Props) {

    return(
        <section className={style.list}>
            {reviews.map((review) => (
                <ReviewItem 
                    key={review.id}
                    onClickOnAvatar={() => onClickOnAvatar(review)}
                    rating={review.rating}
                    review={review}
                />
            ))}
        </section>
    );
}