import style from "./style.module.css";
import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import { Link } from "react-router-dom";

type Props = {
    onSubmit: () => void;
}

export default function RegisterForm({ onSubmit } : Props) {
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <MediumTitle text="Únete a la comunidad" />
            <div className={style.registerName}>
                <InputLabel id="name" placeholder="Nombre" required type="text" />
                <InputLabel id="lastname" placeholder="Apellido" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="password" placeholder="Contraseña" required type="password" />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text="Registrarse" type="submit"/>           
            </div>
            <div className={style.loginText}>
                <p>¿Ya estás registrado?</p>
                <Link to="/login" aria-label="Iniciar sesion">Iniciar sesión</Link>
            </div>
        </form>
    )
}