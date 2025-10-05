import CommentButton from "../comments-button/comments-button";
import InputLabel from "../input-label/input-label";
import style from "./style.module.css";


type Props = {
    onAddComment: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function NewComment({ onAddComment }: Props) {
    return (
        <form className={style.container} onSubmit={onAddComment}>
            <InputLabel 
                id="content"
                placeholder="Agregar comentario..."
                type="text"
                required
            />
            <CommentButton text="Comentar" />
        </form>
    );
}