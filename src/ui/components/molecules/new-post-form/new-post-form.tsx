import { Profile } from "../../../../domain";
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
    profiles: Profile[]
}

export default function NewPostForm( { onSubmit, onCancel, profiles }: Props ) {
    return (
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Nueva publicación"/>
            <div className={style.content}>
                <InputLabel 
                    id="title" 
                    placeholder="Título" 
                    type="text" 
                    label="Título"  
                    required
                />
            </div>
            <div className={style.content}>
                <TextAreaLabel 
                    id="content"
                    placeholder="Contenido"
                    label="Contenido"
                    required
                />
            </div>
            <div className={style.content}>
                <SingleImageInput 
                    id="postImage"
                    value={null}
                    fallbackText="Mantener imágen actual"
                />
            </div>
            <div className={style.section}>
                    <SelectLabel
                        id="profile"
                        label="Perfiles"
                        value={""}
                        values={Profile.mapToNames(profiles)}
                    />
            </div>
            <MainButton enabled text="Publicar" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}