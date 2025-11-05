import type { Review } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    onCancel: () => void;
    review: Review;
    rating: number;
    onRatingChange: (rating: number) => void;
};

export default function EditReviewForm({
    onSubmit, 
    onCancel, 
    review, 
    rating,
    onRatingChange }
    : Props) {
    return(
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Editar reseña"/>
            <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} onClick={() => onRatingChange(i)}>
                    <MusicalNoteRating isSelected={rating >= i} modifier={style.icon} />
                </div>
                ))}
            </div>
            <InputLabel 
                id="review"
                placeholder="Contenido"
                required
                type="text"
                label="Contenido"
                value={review?.review}
            />
            <MainButton enabled text="Enviar reseña" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}