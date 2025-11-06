import editIcon from "../../../assets/icons/edit.svg";
import style from "./style.module.css";

type Props = {
    onClick: () => void;
    text: string;
}

export default function EditButton( {onClick, text} : Props) {
    return(
        <button className={style.button} onClick={onClick}>
            <img
                src={editIcon} 
                alt="Edit" 
                className={style.icon} 
            />
            <span className={style.text}>{text}</span>
        </button>
    )
}