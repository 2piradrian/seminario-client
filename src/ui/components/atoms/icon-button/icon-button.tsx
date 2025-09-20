import style from "./style.module.css"

type Props = {
    text: string;
    type: "submit" | "button";
    enabled: boolean;
    onClick: () => void;
    icon: string;
    modifier?: string;
};

export default function IconButton({
    text, type, enabled, onClick, icon, modifier = ""
}:Props){
    return(
        <button
        className={`${enabled ? style.container : style.containerDisabled} ${modifier}`} 
        type={type} 
        disabled={!enabled} 
        onClick={onClick}
        >
            {text}
            <img src={icon} alt="" className={style.icon}/>
        </button>
    )
    
}