import { Optionable, type Instrument, type Style, type UserProfile } from '../../../../domain'
import InputLabel from '../../atoms/input-label/input-label'
import LargeTitle from '../../atoms/large-title/large-title'
import MainButton from '../../atoms/main-button/main-button'
import MediumTitle from '../../atoms/medium-title/medium-title'
import MultipleSelector from '../../atoms/multiple-selector/multiple-selector'
import SecondaryButton from '../../atoms/secondary-button/secondary-button'
import TextAreaLabel from '../../atoms/textarea-label/textarea-label'
import style from './style.module.css'
import SingleImageInput from '../../atoms/single-image-input/single-image-input'
import DestructiveButton from '../../atoms/destructive-button/destructive-button'
import Modal from '../modal/modal'

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    styles: Style[];
    selectedStyles: string[];
    onAddStyles: (value: string) => void; 
    onRemoveStyles: (value: string) => void;
    instruments: Instrument[];
    selectedInstruments: string[];
    onAddInstruments: (value: string) => void; 
    onRemoveInstruments: (value: string) => void;
    profile: UserProfile;
    onDeleteAccount: () => void;
    isDeleteModalOpen: boolean;
    onConfirmDelete: () => void;
}

export default function EditProfileForm({
    onSubmit,
    onCancel,
    styles,
    selectedStyles,
    onAddStyles,
    onRemoveStyles,
    instruments,
    selectedInstruments,
    onAddInstruments,
    onRemoveInstruments,
    profile,
    onDeleteAccount,
    isDeleteModalOpen,
    onConfirmDelete
}: Props) {

    return (
        <form onSubmit={onSubmit} className={style.container}>
            <LargeTitle text="Editar perfil" />
            <div className={style.content}>
                <MediumTitle text="Información personal" />
                <div className={style.section}>
                    <InputLabel 
                        id="name" 
                        placeholder="Nombre" 
                        type="text" 
                        label="Nombre" 
                        value={profile.name ?? ""} 
                        required
                    />
                    <InputLabel 
                        id="surname" 
                        placeholder="Apellido" 
                        type="text" 
                        label="Apellido" 
                        value={profile.surname ?? ""} 
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
                <MediumTitle text="Sobre mi" />
                <div className={style.section}>
                    <InputLabel 
                        id="shortDescription" 
                        placeholder="Descripción corta" 
                        type="text" 
                        label="Descripción corta" 
                        value={profile.shortDescription ?? ""}
                        required
                        min={10} 
                        max={65}
                    />
                    <TextAreaLabel 
                        id="longDescription" 
                        placeholder="Descripción larga" 
                        label="Descripción larga" 
                        value={profile.longDescription ?? ""}
                        required
                        min={10} 
                        max={150}
                    />
                </div>
                <MediumTitle text="Estilos e instrumentos" />
                <div className={style.section}>
                    <MultipleSelector
                        id="styles"
                        label="Estilos"
                        buttonText="Agregar estilo"
                        options={Optionable.mapToNames(styles)}
                        selected={selectedStyles}
                        onAdd={onAddStyles}
                        onRemove={onRemoveStyles}
                    />
                    <MultipleSelector
                        id="instruments"
                        label="Instrumentos"
                        buttonText="Agregar instrumento"
                        options={Optionable.mapToNames(instruments)}
                        selected={selectedInstruments}
                        onAdd={onAddInstruments}
                        onRemove={onRemoveInstruments}
                    />
                </div>
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
            <DestructiveButton text="Eliminar cuenta" type="button" onClick={onDeleteAccount} />

            {
                isDeleteModalOpen &&
                <Modal
                    title="Eliminar cuenta"
                    description="¿Estás seguro que deseas ELIMINAR tu cuenta? Esta acción no se puede deshacer."
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={onDeleteAccount}
                    onProceed={onConfirmDelete}
                />
            }

        </form>
    )
}