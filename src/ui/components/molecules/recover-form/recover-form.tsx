import { Link } from "react-router-dom";
import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import ISOLOGO from "../../../assets/ISOLOGO_FT.svg";
import style from "./style.module.css";
import SmallTitle from "../../atoms/small-title/small-title";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

export default function RecoverForm({ onSubmit, isSubmitting } : Props) {
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <img className={style.isologo} src={ISOLOGO} alt="isologo" />
            <MediumTitle text="Recupera tu contraseña" />
            <div className={style.inputDelimiter}>
                <SmallTitle text="Introduce tu correo electronico" />
                <InputLabel id="email" placeholder="Email" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text={isSubmitting ? "Cargando..." : "Enviar enlace de recuperacion"} type="submit" enabled={!isSubmitting}/>           
            </div>
            <div className={style.loginText}>
                <p>¿Te acordate de tu contraseña?</p>
                <Link to="/login" aria-label="Iniciar session">Iniciar sesión</Link>
            </div>
        </form>
    )
}
