import InputLabel from "../input-label/input-label";
import style from "./style.module.css";
import MainButton from "../main-button/main-button";
import MusicalNoteRating from "../musical-note-rating/musical-note-rating";
import SmallTitle from "../small-title/small-title";


type Props = {
    onAddReview: (e: React.FormEvent<HTMLFormElement>) => void;
    replyTo?: string | null;        
    placeholderText?: string;
    onRatingChange: (value: number) => void; 
    rating: number;     
};

export default function NewReview({ onAddReview, placeholderText, onRatingChange, rating }: Props) {
    return (
        <form className={style.container} onSubmit={onAddReview}>
            <div className={style.ratingSection}>
                <SmallTitle text="Escribe una reseña:" />
                <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} onClick={() => onRatingChange(i)}>
                    <MusicalNoteRating isSelected={rating >= i} modifier={style.icon} />
                </div>
                ))}
                </div>
            </div>
            
            <div className={style.reviewSection}>
                <InputLabel 
                    id="review"
                    placeholder={placeholderText}
                    type="text"
                    required
                />
                <MainButton 
                    type="submit" 
                    text="Reseña" 
                    enabled={true}
                    modifier={style.button} 
                />
            </div>
        </form>
    );
}