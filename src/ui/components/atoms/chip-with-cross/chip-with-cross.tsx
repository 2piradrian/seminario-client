import style from "./style.module.css"

type Props = {
    text: string;
    onClick?: () => void;
}

export default function ChipWithCross({text, onClick}: Props){
    return(
        <div className={style.container}>
            <span className={style.text}>{text}</span>
            <span className={style.cross} onClick={onClick}>X</span>
        </div>
    )
}