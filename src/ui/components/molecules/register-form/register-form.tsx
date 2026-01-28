import { Link } from "react-router-dom";
import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import ISOLOGO from "../../../assets/ISOLOGO_FT.svg";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

export default function RegisterForm({ onSubmit, isSubmitting } : Props) {
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <img className={style.isologo} src={ISOLOGO} alt="isologo" />
            <MediumTitle text="Únete a la comunidad" />
            <div className={style.nameContainer}>
                <InputLabel id="name" placeholder="Nombre" required type="text" />
                <InputLabel id="surname" placeholder="Apellido" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="password" placeholder="Contraseña" required type="password" />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text={isSubmitting ? "Cargando..." : "Registrarse"} type="submit" enabled={!isSubmitting}/>           
            </div>
            <div className={style.loginText}>
                <p>¿Ya estás registrado?</p>
                <Link to="/login" aria-label="Iniciar session">Iniciar sesión</Link>
            </div>
        </form>
    )
}