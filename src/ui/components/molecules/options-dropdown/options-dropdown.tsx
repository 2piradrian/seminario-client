import IconButton from "../../atoms/main-icon-button/main-icon-button";
import menu from "../../../assets/icons/menu-vertical.svg";
import style from "./style.module.css";

type Props = {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function OptionsDropdown({ 
    isOpen, 
    onToggle, 
    onClose, 
    onEdit, 
    onDelete 
}: Props) {
    return (
        <div className={style.container}>
            <IconButton icon={menu} type="button" enabled onClick={onToggle} text="" modifier={style.button}/>

            {isOpen && (
                <>
                    <div 
                        className={style.invisibleBackdrop} 
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }} 
                    />

                    <div className={style.menu}>
                        {onEdit && (
                            <button 
                                className={style.menuItem} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose(); 
                                    onEdit();
                                }}
                            >
                                Editar
                            </button>
                        )}
                        
                        {onDelete && (
                            <button 
                                className={`${style.menuItem} ${style.delete}`} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                    onDelete();
                                }}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}