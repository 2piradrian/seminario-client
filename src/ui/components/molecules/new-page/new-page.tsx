import { Optionable, type UserProfile } from "../../../../domain"
import InputLabel from "../../atoms/input-label/input-label"
import LargeTitle from "../../atoms/large-title/large-title"
import MainButton from "../../atoms/main-button/main-button"
import MediumTitle from "../../atoms/medium-title/medium-title"
import MultipleSelector from "../../atoms/multiple-selector/multiple-selector"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import SingleImageInput from "../../atoms/single-image-input/single-image-input"
import style from "./style.module.css"

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onCancel: () => void
    users: UserProfile[]
    selectedMembers: string[]
    onAddMember: (value: string) => void
    onRemoveMember: (value: string) => void
}
export default function PageForm({
    onSubmit, onCancel, users, selectedMembers,
    onAddMember, onRemoveMember,
}: Props){
    return (
        <form onSubmit={onSubmit} className={style.container} noValidate>
            <LargeTitle text="Crear Pagina"/>
            <div className={style.content}>
                <MediumTitle text="Datos"/>
                <div className={style.section}>
                    <InputLabel
                        id="name"
                        label="Nombre"
                        placeholder="Nombre de la página"
                        type="text"
                        required={true}
                    />
                </div>

                <MediumTitle text="Imágenes"/>
                <div className={style.section}>
                    <SingleImageInput
                        id="pageImage"
                        label="Imagen de la página"
                        value={null}
                        fallbackText="No hay imagen seleccionada"
                    />
                    <InputLabel
                        id="imageId"
                        label="ID imagen(opcional)"
                        placeholder="ID de imagen"
                        required={false}
                        type="text"
                    />
                </div>

                <MediumTitle text="Miembros"/>
                <div className={style.section}>
                    <MultipleSelector
                        id="members"
                        label="Miembros"
                        buttonText="Agregar miembro"
                        options={Optionable.mapToNames(users)}
                        selected={selectedMembers}
                        onAdd={onAddMember}
                        onRemove={onRemoveMember}
                    />
                </div>
            </div>
            
            <MainButton enabled text="Crear página" type="submit"/>
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel}/>
        </form>
    )
}
