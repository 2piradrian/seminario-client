import style from "./style.module.css";

type Props = {
    text: string;
    onClick: () => void;
    modifier?: string;
}

export default function TextButton({ text, onClick, modifier }: Props) {
    return (
        <button 
            className={`${style.container} ${modifier}`} 
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
}