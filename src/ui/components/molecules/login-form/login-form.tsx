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
                <InputLabel id="password" placeholder="Contraseña" required type="text" label="Ingrese su contraseña:"/>
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text="Ingresar" type="submit"/>           
            </div>
            <Link to="/reset-password" aria-label="Recuperar contraseña">¿Olvidaste tu contraseña?</Link>
            <Link to="/register" aria-label="Crear una cuenta">¿No tenés una cuenta?</Link>
        </form>
    )
    
    
}