import style from "./style.module.css"

type Props = {
    text: string;
    type: "submit" | "button";
    onClick: () => void;
    
}

export default function MainButton({text, type, onClick}: Props) {
  return (
    <button className={style.container} type={type} onClick={onClick}>
      {text}
    </button>
  )
}