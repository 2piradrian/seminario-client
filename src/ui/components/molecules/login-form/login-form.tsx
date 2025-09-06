import MainButton from "../../atoms/main-button/main-button";
import InputLabel from "../../atoms/input-label/input-label";
import style from "./style.module.css";

type Props = {
    onSubmit: () => void;
}

export default function LoginForm({onSubmit}: Props) {
    return (
        <form onSubmit={onSubmit} className={style.container}>
            <div className={style.inputDelimiter}>
                <InputLabel id="email" placeholder="Email" required type="text" label="Ingrese su email"/>
            </div>
            <MainButton onClick={() => {}} text="Ingresar" type="submit"/>           

        </form>
    )
    
    
}