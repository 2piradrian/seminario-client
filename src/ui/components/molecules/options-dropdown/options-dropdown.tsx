import IconButton from "../../atoms/main-icon-button/main-icon-button";
import menu from "../../../assets/icons/menu-vertical.svg";
import style from "./style.module.css";
import MenuButton from "../../atoms/menu-button/menu-button";

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
                            <MenuButton 
                                text="Editar" 
                                onClick={onEdit}
                                onClose={onClose}
                            />
                        )}
                        
                        {onDelete && (
                            <MenuButton 
                                text="Eliminar" 
                                onClick={onDelete}
                                onClose={onClose}
                                modifier={style.deleteBtn}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}