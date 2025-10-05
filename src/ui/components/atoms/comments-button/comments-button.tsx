import commentImage from "../../../assets/icons/comment.svg";
import style from "./style.module.css";

type Props = {
    text: string;
    onClick?: () => void;
}

export default function CommentButton( {onClick, text} : Props) {
    return(
        <button className={style.button} onClick={onClick}>
            <img
                src={commentImage} 
                alt="comment image" 
                className={style.icon} 
            />
            <span className={style.text}>{text}</span>
        </button>
    )
}