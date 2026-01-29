import { useState } from 'react';
import See from '../../../assets/icons/password-see.svg'
import Unsee from '../../../assets/icons/password-unsee.svg'
import style from "./style.module.css"

type Props = {
    id: string;
    placeholder:string;
    required?: boolean;
    label?: string;
    value?: string;
    showPassword: boolean;
    onClickPassword: () => void;
}

export default function PasswordInput({
    label, 
    placeholder, 
    id,
    value,
    required, 
    showPassword,
    onClickPassword
}: Props) {

    const [self, setSelf] = useState<string | undefined>(value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelf(e.target.value);
    }

    return(
        <div className={style.container}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={style.inputWrapper}>
    		    <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={placeholder} 
                    name={id} 
                    value={self} 
                    onChange={handleChange} 
                    required={required} 
                    onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()} 
                />
                <button
                    type="button"
                    className={style.toggleButton}
                    onClick={onClickPassword}
                >
                    {showPassword ? 
                        <img src={Unsee} alt="Ocultar" className={style.icon} /> 
                    :
                        <img src={See} alt="Mostrar" className={style.icon} />}
                </button>
            </div>
        </div>
    )

}
