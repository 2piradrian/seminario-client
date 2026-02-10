import { PostType, type Post } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import TextAreaLabel from "../../atoms/textarea-label/textarea-label";
import SelectLabel from "../../atoms/select-label/select-label";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    item: any; 
    isSubmitting: boolean;
}

export default function EditCatalogForm( {onSubmit, onCancel, item, isSubmitting}: Props ) {
    return (
        <div className={style.backdrop}>
            <div className={style.panel}>
                <form className={style.container} onSubmit={onSubmit}>
                    <LargeTitle text="Editar catálogo"/>
                    <InputLabel 
                        id="name"
                        placeholder="Nombre"
                        required
                        type="text"
                        value={item?.name}
                    />
                    <div className={style.actions}>
                        <MainButton enabled={!isSubmitting} text={isSubmitting ? "Cargando..." : "Guardar cambios"} type="submit" />
                    <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
                    </div>
                </form>
            </div>

        </div>
    )

}