import style from "./style.module.css"

type Props = {
    text: string;
    onClick: () => void;
    type: "submit" | "button";
}


export default function DestructiveButton({text, onClick, type}: Props) {
    return (
    <button className={style.container} onClick={onClick} type={type}>
      {text}
    </button>
  )
}