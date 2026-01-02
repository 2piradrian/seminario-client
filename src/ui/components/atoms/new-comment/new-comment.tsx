import CommentButton from "../comments-button/comments-button";
import InputLabel from "../input-label/input-label";
import SelectLabel from "../select-label/select-label";
import { Profile } from "../../../../domain";
import style from "./style.module.css";
import MainButton from "../main-button/main-button";


type Props = {
    onAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
    profiles: Profile[];
    replyTo?: string | null;        
    placeholderText?: string;     
};

export default function NewComment({ onAddComment, profiles, placeholderText }: Props) {
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
                    placeholder={placeholderText}
                    type="text"
                    required
                />
                <MainButton type="submit" text="Comentar" enabled={true} modifier={style.button} />
            </div>
        </form>
    );
}