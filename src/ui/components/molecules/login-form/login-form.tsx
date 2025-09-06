import MainButton from "../../atoms/main-button/main-button";
import InputLabel from "../../atoms/input-label/input-label";
import MediumTitle from "../../atoms/medium-title/medium-title";
import SmallTitle from "../../atoms/small-title/small-title";
import style from "./style.module.css";

type Props = {
    onSubmit: () => void;
}

export default function LoginForm({onSubmit}: Props) {
    return (
        <form onSubmit={onSubmit} className={style.container}>
            <MediumTitle text="Iniciar sesión"/>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" label="Ingrese su email:"/>
            </div>
            <div className={style.inputDelimiter}>
                <InputLabel id="password" placeholder="Contraseña" required type="text" label="Ingrese su contraseña:"/>
            </div>
            <MainButton onClick={() => {}} text="Ingresar" type="submit"/>           

            <SmallTitle text="Olvidaste tu contraseña?"/>
            <SmallTitle text="No tenes una cuenta? Registrate"/>
        </form>
    )
    
    
}