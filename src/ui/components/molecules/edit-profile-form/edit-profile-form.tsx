import InputLabel from '../../atoms/input-label/input-label'
import LargeTitle from '../../atoms/large-title/large-title'
import MediumTitle from '../../atoms/medium-title/medium-title'
import TextAreaLabel from '../../atoms/textarea-label/textarea-label'
import style from './style.module.css'

export default function EditProfileForm() {
    return (
        <div className={style.container}>
            <LargeTitle text="Editar perfil" />
            <div className={style.content}>
                <MediumTitle text="Información personal" />
                <div className={style.section}>
                    <InputLabel id="name" placeholder="Nombre" required type="text" label="Nombre" />
                    <InputLabel id="surname" placeholder="Apellido" required type="text" label="Apellido" />
                </div>
                <MediumTitle text="Sobre mi" />
                <div className={style.section}>
                    <InputLabel id="shortDescription" placeholder="Descripción corta" required type="text" label="Descripción corta" />
                    <TextAreaLabel id="longDescription" placeholder="Descripción larga" required label="Descripción larga" />
                </div>
                <MediumTitle text="Estilos e instrumentos" />
            </div>
        </div>
    )
}