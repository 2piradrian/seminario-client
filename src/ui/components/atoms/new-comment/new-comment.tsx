import CommentButton from "../comments-button/comments-button";
import InputLabel from "../input-label/input-label";
import SelectLabel from "../select-label/select-label";
import { Profile } from "../../../../domain";
import style from "./style.module.css";


type Props = {
    onAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
    profiles: Profile[]
};

export default function NewComment({ onAddComment, profiles }: Props) {
    return (
        <form className={style.container} onSubmit={onAddComment}>
            <div className={style.profileSection}>
                    <SelectLabel
                        id="profile"
                        label="Perfiles"
                        value={""}
                        values={Profile.mapToNames(profiles)}
                    />
            </div>
            <div className={style.commentSection}>
                <InputLabel 
                    id="content"
                    placeholder="Agregar comentario..."
                    type="text"
                    required
                />
                <CommentButton text="Comentar" />
            </div>
        </form>
    );
}