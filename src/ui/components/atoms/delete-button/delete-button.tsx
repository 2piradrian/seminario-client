import trashIcon from "../../../assets/icons/trash-icon.svg";
import style from "./style.module.css";

type Props = {
    onClick: () => void;
    text: string;
}

export default function DeleteButton( {onClick, text} : Props) {
    return(
        <button className={style.button} onClick={onClick}>
            <img
                src={trashIcon} 
                alt="Delete" 
                className={style.icon} 
            />
            <span className={style.text}>{text}</span>
        </button>
    )
}