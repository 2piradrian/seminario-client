import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import ISOLOGO from "../../../assets/ISOLOGO_FT.svg";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditPasswordForm({ onSubmit } : Props) {
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <img className={style.isologo} src={ISOLOGO} alt="isologo" />
            <MediumTitle text="Cambia tu contraseña" />
            <div className={style.inputDelimiter}>
                <InputLabel id="password" placeholder="Nueva Contraseña" required type="password" />
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="confirmPassword" placeholder="Confirmar Contraseña" required type="password" />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text="Cambiar contraseña" type="submit" enabled={true}/>           
            </div>
        </form>
    )
}
