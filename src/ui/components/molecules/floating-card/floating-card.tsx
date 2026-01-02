import LargeTitle from "../../atoms/large-title/large-title";
import IconButton from "../../atoms/main-icon-button/main-icon-button";
import cross from "../../../assets/icons/close-circle.svg";
import style from "./style.module.css";

type Props = {
    children: React.ReactNode;
    title: string;
    onClose?: () => void;
    pageNumber: number;
    onPrev: () => void;
    onNext: () => void;
    disabledNext: boolean;
    disabledPrev: boolean;
}

export default function FloatingCard( { children, title, onClose, pageNumber, onNext, onPrev, disabledNext, disabledPrev }: Props) {
    return(
        <div className={style.container}>
            <div className={style.panel}>
                { onClose && 
                    <IconButton enabled icon={cross} onClick={onClose} type="button" modifier={style.closeButton} />    
                }
                <LargeTitle text={title} />
                {children}
                <div className={style.pagination}>
                    <button className={style.arrow} onClick={onPrev} disabled={disabledPrev} >
                        ‹
                    </button>
                    <span className={style.page}>{pageNumber}</span>
                    <button className={style.arrow} onClick={onNext} disabled={disabledNext}>
                        ›
                    </button>
                </div>
            </div>
        </div>
    )
}

