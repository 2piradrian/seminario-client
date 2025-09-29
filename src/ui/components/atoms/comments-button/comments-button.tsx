import commentImage from "../../../assets/icons/comment.svg";
import style from "./style.module.css";

type Props = {
    onClick: () => void;
}

export default function CommentButton( {onClick} : Props) {
    return(
        <button className={style.button} onClick={onClick}>
            <img
                src={commentImage} 
                alt="comment image" 
                className={style.icon} 
            />
            <span>Comentar</span>
        </button>
    )
}