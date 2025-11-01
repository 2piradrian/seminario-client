import type { Post } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import TextAreaLabel from "../../atoms/textarea-label/textarea-label";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    post: Post; 
}

export default function EditPostForm( {onSubmit, onCancel, post}: Props ) {
    return(
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Editar publicación"/>
            <div className={style.content}>
                <InputLabel 
                    id="title" 
                    placeholder="Título" 
                    type="text" 
                    label="Título"  
                    required
                    value={post?.title}
                />
            </div>
            <div className={style.content}>
                <TextAreaLabel 
                    id="content"
                    placeholder="Contenido"
                    label="Contenido"
                    required
                    value={post?.content}
                />
            </div>
            <div className={style.content}>
                <SingleImageInput 
                    id="postImage"
                    value={null}
                    fallbackText="Mantener imágen actual"
                />
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}