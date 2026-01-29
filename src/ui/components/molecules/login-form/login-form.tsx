import { Link } from "react-router-dom";
import MainButton from "../../atoms/main-button/main-button";
import InputLabel from "../../atoms/input-label/input-label";
import PasswordInput from "../../atoms/password-input/password-input";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ISOTIPO from "../../../assets/ISOTIPO_FT.svg";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClickPassword: () => void;
    showPassword: boolean
}

export default function LoginForm({ 
    onSubmit,
    onClickPassword,
    showPassword
}: Props) {
    return (
        <form onSubmit={onSubmit} className={style.container}>
            <img className={style.isotipo} src={ISOTIPO} alt="isologo de la marca" />
            <MediumTitle text="Iniciar sesión"/>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" />
            </div>
            <div className={style.inputDelimiter}>
                <PasswordInput id="password" placeholder="Contraseña" required onClickPassword={onClickPassword} showPassword={showPassword}/>
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text="Iniciar sesión" type="submit" enabled={true}/>           
            </div>
            <Link to="/reset-password" aria-label="Recuperar contraseña">¿Has olvidado tu contraseña?</Link>
            <div className={style.registerText}>
                <p>¿Primera vez?</p>
                <Link to="/register" aria-label="Crear una cuenta">Regístrate</Link>
            </div>
        </form>
    )
}
