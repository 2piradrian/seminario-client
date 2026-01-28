import { useState } from "react";
import MediumTitle from "../../atoms/medium-title/medium-title";
import PasswordInput from "../../atoms/password-input/password-input";
import MainButton from "../../atoms/main-button/main-button";
import ISOLOGO from "../../../assets/ISOLOGO_FT.svg";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

export default function EditPasswordForm({ onSubmit, isSubmitting } : Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    onClickPassword={() => setShowPassword(!showPassword)}
                />
            </div>
            <div className={style.inputDelimiter}>
                <PasswordInput 
                    id="confirmPassword" 
                    placeholder="Confirmar Contraseña" 
                    required 
                    showPassword={showConfirmPassword} 
                    onClickPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
            </div>
            <div className={style.inputDelimiter}>
                <MainButton onClick={() => {}} text={isSubmitting ? "Cargando..." : "Cambiar contraseña"} type="submit" enabled={!isSubmitting}/>           
            </div>
        </form>
    )
}
