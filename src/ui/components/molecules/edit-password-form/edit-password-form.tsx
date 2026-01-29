import MediumTitle from "../../atoms/medium-title/medium-title";
import PasswordInput from "../../atoms/password-input/password-input";
import MainButton from "../../atoms/main-button/main-button";
import ISOLOGO from "../../../assets/ISOLOGO_FT.svg";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onClickPassword: () => void;
    onClickConfirmPassword: () => void;
}

export default function EditPasswordForm({ 
    onSubmit, 
    isSubmitting,
    showPassword,
    showConfirmPassword,
    onClickPassword,
    onClickConfirmPassword
} : Props) {
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <img className={style.isologo} src={ISOLOGO} alt="isologo" />
            <MediumTitle text="Cambia tu contraseña" />
            <div className={style.inputDelimiter}>
                <PasswordInput 
                    id="password" 
                    placeholder="Nueva Contraseña" 
                    required 
                    showPassword={showPassword} 
                    onClickPassword={onClickPassword}
                />
            </div>
            <div className={style.inputDelimiter}>
                <PasswordInput 
                    id="confirmPassword" 
                    placeholder="Confirmar Contraseña" 
                    required 
                    showPassword={showConfirmPassword} 
                    onClickPassword={onClickConfirmPassword}
                />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text={isSubmitting ? "Cargando..." : "Cambiar contraseña"} type="submit" enabled={!isSubmitting}/>           
            </div>
        </form>
    )
}
