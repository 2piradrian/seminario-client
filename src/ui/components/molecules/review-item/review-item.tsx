import { Profile, type Review } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import DeleteButton from "../../atoms/delete-button/delete-button";
import EditButton from "../../atoms/edit-button/edit-button";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import style from "./style.module.css";

type  Props = {
    review: Review
    onClickOnAvatar: () => void; 
    rating: number;
    onClickOnReview: () => void;
    onClickDelete: () => void;
    onClickEdit: () => void;
    isMine: boolean;
}
export default function ReviewItem({
    review, 
    onClickOnAvatar,
     rating,
    onClickOnReview,
    onClickDelete,
    onClickEdit,
    isMine,
    }: Props) {
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
            <div className={style.content} onClick={onClickOnReview}>
                <p className={style.contentReview}>{review.review}</p>
            </div>
            {isMine && (
                <div className={style.actions}>
                    <EditButton text="Editar" onClick={onClickEdit} />
                    <DeleteButton text="Eliminar" onClick={onClickDelete} />
                </div>
        )}
        </article>
    )
}