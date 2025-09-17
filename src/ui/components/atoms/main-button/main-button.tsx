import style from "./style.module.css"

type Props = {
    text: string;
    type: "submit" | "button";
    enabled: boolean; 
    onClick: () => void;
    
}

export default function MainButton({text, type, enabled, onClick}: Props) {
  return (
    <button className={enabled ? style.container : style.containerDisabled} type={type} disabled={!enabled} onClick={onClick}>
      {text}
    </button>
  )
}