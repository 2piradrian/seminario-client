import { Optionable, PageType, UserProfile, type PageProfile, type User } from "../../../../domain";
import LargeTitle from "../../atoms/large-title/large-title";
import MediumTitle from "../../atoms/medium-title/medium-title";
import InputLabel from "../../atoms/input-label/input-label";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import TextAreaLabel from "../../atoms/textarea-label/textarea-label";
import style from "./style.module.css";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import MainButton from "../../atoms/main-button/main-button";
import SelectLabel from "../../atoms/select-label/select-label";
import MultipleSelector from "../../atoms/multiple-selector/multiple-selector";


type Props = {
    page: PageProfile;
    pageTypes: PageType[];
    users: User[];
    selectedMembers: UserProfile[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    onAddMembers: (value: string) => void,
    onRemoveMembers: (value: string) => void,
    handleSearchChange: (text: string) => void,
}
export default function EditPageForm({
    page,
    pageTypes,
    users,
    selectedMembers,
    onSubmit,
    onCancel,
    onAddMembers,
    onRemoveMembers
}: Props) {
    return (
        <form onSubmit={onSubmit} className={style.container}>

            <LargeTitle text="Editar Página" />

            <div className={style.content}>

                <MediumTitle text="Información de la página" />
                <div className={style.section}>
                    <InputLabel
                        id="name"
                        placeholder="Nombre de la página"
                        type="text"
                        label="Nombre de la página"
                        value={page.name ?? ""}
                        required
                    />
                    <SelectLabel
                        id="pageType"
                        label="Tipo"
                        value={PageType.mapToName(page.pageType.id, pageTypes)}
                        values={PageType.mapToNames(pageTypes)}
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


                <MediumTitle text="Miembros" />

                <div className={style.searchBox}>
                    <MultipleSelector
                        id="users"
                        label="Miembros"
                        buttonText="Agregar miembro"
                        options={UserProfile.mapToNames(users.map(u => u.profile))}
                        selected={selectedMembers.map(m => m.name)}
                        onAdd={onAddMembers}
                        onRemove={onRemoveMembers}
                    />
                </div>

            </div>

            <MainButton enabled text="Guardar cambios" type="submit" />

            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}
