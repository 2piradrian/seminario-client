import { PostType, Profile } from "../../../../domain";
import LargeTitle from "../../atoms/large-title/large-title";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import TextAreaLabel from "../../atoms/textarea-label/textarea-label";
import SelectLabel from "../../atoms/select-label/select-label";
import style from "./style.module.css"; 

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    isSubmitting: boolean;
    title: string;
}

export default function NewCatalogForm({ 
    onSubmit, 
    onCancel, 
    isSubmitting,
    title
}: Props ) {

    return (
        <div className={style.backdrop}>
            <div className={style.panel}>
                <form className={style.container} onSubmit={onSubmit}>
                    <LargeTitle text={title}/>
                    <InputLabel 
                        id="name"
                        placeholder="Nombre"
                        required
                        type="text"
                    />
                    <div className={style.actions}>
                        <MainButton enabled={!isSubmitting} text={isSubmitting ? 'Cargando...' : 'Enviar'} type="submit" />
                        <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
                    </div>
                </form>
            </div>

        </div>
    )
}
