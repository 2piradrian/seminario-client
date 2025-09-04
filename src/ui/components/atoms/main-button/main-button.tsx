import style from "./style.module.css"

type Props = {
    text: string;
    onClick: () => void;
}

export default function MainButton({text, onClick}: Props) {
  return (
    <div className={style.container} onClick={onClick}>
      {text}
    </div>
  )
}