import { Review } from "../../../../domain"
import ReviewItem from "../../molecules/review-item/review-item";
import style from "./style.module.css"
type Props = {
    reviews: Review[];
    isMine?: boolean;
    onClickOnAvatar: (review: Review) => void;
    onClickDelete?: (reviewId: string) => void;
    currentUserId?: string;
    activeMenuId?: string | null;
    onToggleMenu?: (id: string) => void;
    onCloseMenu?: () => void;
}

export default function ReviewList({
    reviews, 
    onClickOnAvatar, 
    onClickDelete, 
    currentUserId,
    activeMenuId,
    onToggleMenu,
    onCloseMenu
}:Props) {

    return(
        <section className={style.list}>
            {reviews.map((review) => (
                <ReviewItem 
                    key={review.id}
                    rating={review.rating}
                    review={review}
                    onClickOnAvatar={() => onClickOnAvatar(review)}
                    onClickDelete={() => onClickDelete?.(review.id)}
                    isMine={review.reviewerUser?.id === currentUserId}
                    isMenuOpen={activeMenuId === review.id}
                    onToggleMenu={() => onToggleMenu?.(review.id)}
                    onCloseMenu={onCloseMenu}
                />
            ))}
        </section>
    );
}