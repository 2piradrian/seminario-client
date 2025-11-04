import type { Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import MusicalNoteRating from "../../atoms/musical-note-rating/musical-note-rating";
import style from "./style.module.css";

type Props = {
    profile: Profile;
    onClickOnAvatar: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    rating: number;                        
    onRatingChange: (value: number) => void;
}

export default function NewReviewForm({ profile, onClickOnAvatar, onSubmit, rating, onRatingChange }: Props) {    
    return (
        <form className={style.container} onSubmit={onSubmit}>
            <Avatar onClick={onClickOnAvatar} profile={profile} />
            <InputLabel 
                id="review"
                placeholder="Contenido"
                required
                type="text"
            />
             <div className={style.rating}>
                {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} onClick={() => onRatingChange(i)}>
                    <MusicalNoteRating isSelected={rating >= i} />
                </div>
                ))}
            </div>
            <MainButton enabled text="Enviar reseña" type="submit" />
        </form>
    )
}
