import type { Instrument, Style, UserProfile } from '../../../../domain'
import InputLabel from '../../atoms/input-label/input-label'
import LargeTitle from '../../atoms/large-title/large-title'
import MainButton from '../../atoms/main-button/main-button'
import MediumTitle from '../../atoms/medium-title/medium-title'
import MultipleSelector from '../../atoms/multiple-selector/multiple-selector'
import SecondaryButton from '../../atoms/secondary-button/secondary-button'
import TextAreaLabel from '../../atoms/textarea-label/textarea-label'
import style from './style.module.css'

type Props = {
    styles: Style[];
    selectedStyles: string[];
    onAddStyles: (value: string) => void; 
    onRemoveStyles: (value: string) => void;
    instruments: Instrument[];
    selectedInstruments: string[];
    onAddInstruments: (value: string) => void; 
    onRemoveInstruments: (value: string) => void;
    profile: UserProfile;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

export default function EditProfileForm({
    onSubmit, onCancel, styles, selectedStyles, onAddStyles, onRemoveStyles, instruments, selectedInstruments, onAddInstruments, onRemoveInstruments, profile
} : Props) {
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
                    <InputLabel 
                        id="profileImage" 
                        placeholder="URL de la imágen" 
                        type="text" 
                        label="Imágen de perfil" 
                        value={profile.profileImage ?? ""} 
                        required 
                    />
                    <InputLabel 
                        id="portraitImage" 
                        placeholder="URL de la imágen" 
                        type="text" 
                        label="Imágen de portada" 
                        value={profile.portraitImage ?? ""}
                        required 
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
                    />
                    <TextAreaLabel 
                        id="longDescription" 
                        placeholder="Descripción larga" 
                        label="Descripción larga" 
                        value={profile.longDescription ?? ""}
                        required 
                    />
                </div>
                <MediumTitle text="Estilos e instrumentos" />
                <div className={style.section}>
                    <MultipleSelector
                        id="styles"
                        label="Estilos"
                        buttonText="Agregar estilo"
                        options={styles.map(s => s.name)}
                        selected={selectedStyles}
                        onAdd={onAddStyles}
                        onRemove={onRemoveStyles}
                    />
                    <MultipleSelector
                        id="instruments"
                        label="Instrumentos"
                        buttonText="Agregar instrumento"
                        options={instruments.map(i => i.name)}
                        selected={selectedInstruments}
                        onAdd={onAddInstruments}
                        onRemove={onRemoveInstruments}
                    />
                </div>
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" onClick={()=>{}} />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )
}