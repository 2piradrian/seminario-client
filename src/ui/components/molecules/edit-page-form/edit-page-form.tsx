import type { PageProfile } from "../../../../domain";
import LargeTitle from "../../atoms/large-title/large-title";
import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import TextAreaLabel from "../../atoms/textarea-label/textarea-label";
import style from "./style.module.css";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import MainButton from "../../atoms/main-button/main-button";


type Props = {
    page: PageProfile;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void; 
}
export default function EditPageForm( {page, onSubmit, onCancel}: Props) {  
    return(
        <form onSubmit={onSubmit} className={style.container}>
            <LargeTitle text="Editar Página" />
            <div className={style.content}>
                <MediumTitle text="Información de la página"/>
                <div className={style.section}>
                    <InputLabel 
                        id="name" 
                        placeholder="Nombre de la página" 
                        type="text" 
                        label="Nombre de la página" 
                        value={page.name ?? ""} 
                        required
                    />
                </div>
                <MediumTitle text="Imágenes" />
                <div className={style.section}>
                    <SingleImageInput
                        id="profileImage"
                        label="Imagen de perfil"
                        value={null}
                        fallbackText="No hay imagen seleccionada"
                    />
                    <SingleImageInput
                        id="portraitImage"
                        label="Imagen de portada"
                        value={null}
                        fallbackText="No hay imagen seleccionada"
                    />
                </div>
                <MediumTitle text="Sobre la página" />
                    <div className={style.section}>
                        <InputLabel 
                            id="shortDescription" 
                            placeholder="Descripción corta" 
                            type="text" 
                            label="Descripción corta" 
                            value={page.shortDescription ?? ""}
                            required 
                        />
                        <TextAreaLabel 
                            id="longDescription" 
                            placeholder="Descripción larga" 
                            label="Descripción larga" 
                            value={page.longDescription ?? ""}
                            required 
                        />
                    </div>
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}