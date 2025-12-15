import cancelIcon from "../../../assets/icons/cancel-icon.svg";
import style from "./style.module.css";

type Props = {
    onClick: () => void;
    text: string;
}

export default function CancelButton( {onClick, text} : Props) {
    return(
        <button className={style.button} onClick={onClick}>
            <img
                src={cancelIcon} 
                alt="Cancelar" 
                className={style.icon} 
            />
            <span className={style.text}>{text}</span>
        </button>
    )
}
