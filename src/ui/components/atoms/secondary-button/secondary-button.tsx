import style from "./style.module.css"

type Props = {
    text: string;
    onClick: () => void;
}

export default function SecondaryButton({text, onClick}: Props) {
  return (
    <div className={style.container} onClick={onClick}>
      {text}
    </div>
  )
}