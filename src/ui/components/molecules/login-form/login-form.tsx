import MainButton from "../../atoms/main-button/main-button";
import InputLabel from "../../atoms/input-label/input-label";
import MediumTitle from "../../atoms/medium-title/medium-title";
import { Link } from "react-router-dom";
import style from "./style.module.css";

type Props = {
    onSubmit: () => void;
}

export default function LoginForm({ onSubmit }: Props) {
    return (
        <form onSubmit={onSubmit} className={style.container}>
            <MediumTitle text="Iniciar sesión"/>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" label="Ingrese su email:"/>
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="password" placeholder="Contraseña" required type="password" label="Ingrese su contraseña:"/>
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text="Iniciar sesión" type="submit"/>           
            </div>
            <Link to="/reset-password" aria-label="Recuperar contraseña">¿Has olvidado tu contraseña?</Link>
            <div className={style.registerText}>
                <p>¿Primera vez?</p>
                <Link to="/register" aria-label="Crear una cuenta">Regístrate</Link>
            </div>
            
        </form>
    )
    
}