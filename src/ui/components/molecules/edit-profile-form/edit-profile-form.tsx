import InputLabel from '../../atoms/input-label/input-label'
import LargeTitle from '../../atoms/large-title/large-title'
import MainButton from '../../atoms/main-button/main-button'
import MediumTitle from '../../atoms/medium-title/medium-title'
import MultipleSelector from '../../atoms/multiple-selector/multiple-selector'
import SecondaryButton from '../../atoms/secondary-button/secondary-button'
import TextAreaLabel from '../../atoms/textarea-label/textarea-label'
import style from './style.module.css'

export default function EditProfileForm() {
    return (
        <form className={style.container}>
            <LargeTitle text="Editar perfil" />
            <div className={style.content}>
                <MediumTitle text="Información personal" />
                <div className={style.section}>
                    <InputLabel id="name" placeholder="Nombre" required type="text" label="Nombre" />
                    <InputLabel id="surname" placeholder="Apellido" required type="text" label="Apellido" />
                </div>
                <MediumTitle text="Imágenes" />
                <div className={style.section}>
                    <InputLabel id="profileImage" placeholder="URL de la imágen" required type="text" label="Imágen de perfil" />
                    <InputLabel id="portraitImage" placeholder="URL de la imágen" required type="text" label="Imágen de portada" />
                </div>
                <MediumTitle text="Sobre mi" />
                <div className={style.section}>
                    <InputLabel id="shortDescription" placeholder="Descripción corta" required type="text" label="Descripción corta" />
                    <TextAreaLabel id="longDescription" placeholder="Descripción larga" required label="Descripción larga" />
                </div>
                <MediumTitle text="Estilos e instrumentos" />
                <div className={style.section}>
                    <MultipleSelector
                        id="styles"
                        label="Estilos"
                        buttonText="Agregar estilo"
                        options={["Rock", "Pop", "Jazz", "Clásica", "Metal", "Blues", "Funk", "Reggae"]}
                        selected={["Rock", "Pop"]}
                        onAdd={(value) => { console.log("Agregar estilo: ", value) }}
                        onRemove={(value) => { console.log("Remover estilo: ", value) }}
                    />
                    <MultipleSelector
                        id="instruments"
                        label="Instrumentos"
                        buttonText="Agregar instrumento"
                        options={["Guitarra", "Bajo", "Batería", "Piano", "Violín", "Saxofón", "Trompeta", "Flauta"]}
                        selected={["Guitarra", "Bajo"]}
                        onAdd={(value) => { console.log("Agregar instrumento: ", value) }}
                        onRemove={(value) => { console.log("Remover instrumento: ", value) }}
                    />
                </div>
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" onClick={() => { console.log("Guardar cambios") }} />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={() => { console.log("Cancelar") }} />
        </form>
    )
}