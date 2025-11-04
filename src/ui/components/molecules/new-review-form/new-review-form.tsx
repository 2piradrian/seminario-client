import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    rating: number;                        
    onRatingChange: (value: number) => void;
}

export default function NewReviewForm({ onSubmit, rating, onRatingChange }: Props) {    
    return (
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Nueva Reseña"/>
            <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} onClick={() => onRatingChange(i)}>
                    <MusicalNoteRating isSelected={rating >= i} />
                </div>
                ))}
            </div>
            <InputLabel 
                id="review"
                placeholder="Contenido"
                required
                type="text"
            />
            <MainButton enabled text="Enviar reseña" type="submit" />
        </form>
    )
}
