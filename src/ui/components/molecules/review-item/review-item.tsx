import { Profile, type Review } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import TimeAgo from "../../atoms/time-ago/time-ago";
import OptionsDropdown from "../options-dropdown/options-dropdown";
import style from "./style.module.css";

type  Props = {
    review: Review
    onClickOnAvatar: () => void; 
    rating: number;
    onClickDelete: () => void;
    isMine: boolean;
    isAdminOrMod?: boolean;
    isMenuOpen?: boolean;
    onToggleMenu?: () => void;
    onCloseMenu?: () => void;
    onClickEdit?: () => void;
}
export default function ReviewItem({
    review, 
    onClickOnAvatar,
    rating,
    onClickDelete,
    isMine,
    isAdminOrMod,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    onClickEdit
    }: Props) {
    return(
        <article className={style.container}>
            <div className={style.headerReview}>
                <Avatar 
                    profile={Profile.fromEntity(review.reviewerUser, undefined)} 
                    onClick={onClickOnAvatar} 
                    hideName={true}
                />
                <div className={style.reviewerInfo}>
                    <span>{review.reviewerUser.name} {review.reviewerUser.surname}</span>
                    <TimeAgo createdAt={review.createdAt} />
                </div>
                <div className={style.rating}>
                    {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                        <MusicalNoteRating isSelected={rating >= i} />
                    </div>
                    ))}

                </div>
                {(isMine || isAdminOrMod) && (
                    <div className={style.actions}>
                        <OptionsDropdown
                            isOpen={isMenuOpen} 
                            onClose={onCloseMenu}
                            onToggle={onToggleMenu}
                            onDelete={onClickDelete} 
                            onEdit={isMine ? onClickEdit : undefined}
                        />
                    </div>
                )}
            </div>
            <div className={style.content}>
                <p className={style.contentReview}>{review.review}</p>
            </div>

        </article>
    )
}
