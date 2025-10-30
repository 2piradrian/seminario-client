import { Profile, type Review } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import style from "./style.module.css";

type  Props = {
    review: Review
    onClickOnAvatar: () => void; 
    rating: number;
}
export default function ReviewItem({review, onClickOnAvatar, rating}: Props) {
    return(
        <article className={style.container}>
            <div className={style.headerReview}>
                <Avatar 
                    profile={Profile.fromEntity(review.reviewerUser, undefined)} 
                    onClick={onClickOnAvatar} 
                />
                <div className={style.rating}>
                    {[1, 2, 3, 4, 5].map((i) => (
                    <div>
                        <MusicalNoteRating isSelected={rating >= i} />
                    </div>
                    ))}
                </div>
            </div>
            <div className={style.content}>
                <p className={style.contentReview}>{review.review}</p>
            </div>
        </article>
    )
}