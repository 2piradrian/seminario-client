import commentImage from "../../../assets/icons/comment.svg";
import style from "./style.module.css";

type Props = {
    text: string;
    onClick?: () => void;
    modifier?: string;
    iconSrc?: string;
}

export default function CommentButton( {onClick, text, modifier, iconSrc} : Props) {
    return(
        <button className={`${style.button} ${modifier}`} onClick={onClick}>
            <img
                src={iconSrc || commentImage} 
                alt="comment image" 
                className={style.icon} 
            />
            <span className={style.text}>{text}</span>
        </button>
    )
}