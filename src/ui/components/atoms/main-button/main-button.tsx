import style from "./style.module.css"

type Props = {
    text: string;
    type: "submit" | "button";
    enabled: boolean; 
    onClick?: () => void;
    modifier?: string;  
}

export default function MainButton({ text, type, enabled, onClick, modifier }: Props) {
  return (
    <button 
      className={`${enabled ? style.container : style.containerDisabled} ${modifier}`} 
      type={type} 
      disabled={!enabled} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}