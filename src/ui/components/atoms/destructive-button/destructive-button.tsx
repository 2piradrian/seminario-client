import style from "./style.module.css"

type Props = {
    text: string;
    onClick: () => void;
}


export default function DestructiveButton({text, onClick}: Props) {
    return (
    <button className={style.container} onClick={onClick}>
      {text}
    </button>
  )
}