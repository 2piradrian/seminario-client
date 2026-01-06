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
}

export default function EditReviewCard({ onSubmit, onCancel, review, rating, onRatingChange }: Props) {
    return (
        <div
        className={style.backdrop} 
            role="dialog" 
            aria-modal="true" 
            onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
            <div className={style.panel}>
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

                    <div className={style.actions}>
                        <SecondaryButton 
                            enabled 
                            text="Cancelar" 
                            type="button" 
                            onClick={onCancel} 
                        />
                        <MainButton 
                            enabled 
                            text="Guardar cambios" 
                            type="submit" 
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}