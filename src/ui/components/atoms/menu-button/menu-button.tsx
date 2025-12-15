import style from "./style.module.css";

type Props = {
    text: string;
    onClick: () => void;
    onClose?: () => void;
    modifier?: string;
}

export default function MenuItemButton({ 
    text, 
    onClick, 
    onClose, 
    modifier 
}: Props) {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); 
        if (onClose) {
            onClose();
        }
        onClick();
    };

    return (
        <button 
            className={`${style.container} ${modifier}`} 
            type="button"
            onClick={handleClick}
        >
            {text}
        </button>
    );
}