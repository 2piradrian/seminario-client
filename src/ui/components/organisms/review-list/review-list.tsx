import { Review } from "../../../../domain"
import ReviewItem from "../../molecules/review-item/review-item";
import style from "./style.module.css"
type Props = {
    reviews: Review[];
    isMine?: boolean;
    onClickOnReview: (reviewId: string) => void;
    onClickOnAvatar: (review: Review) => void;
    onClickDelete?: (reviewId: string) => void;
    onClickEdit?: (reviewId: string) => void;
}

export default function ReviewList({
    reviews, 
    onClickOnAvatar, 
    onClickOnReview, 
    onClickDelete, 
    onClickEdit, 
    isMine = false
}:Props) {

    return(
        <section className={style.list}>
            {reviews.map((review) => (
                <ReviewItem 
                    key={review.id}
                    rating={review.rating}
                    review={review}
                    onClickOnReview={()=> onClickOnReview(review.id)}
                    onClickOnAvatar={() => onClickOnAvatar(review)}
                    onClickDelete={() => onClickDelete?.(review.id)}
                    onClickEdit={() => onClickEdit?.(review.id)}
                    isMine={isMine}
                />
            ))}
        </section>
    );
}