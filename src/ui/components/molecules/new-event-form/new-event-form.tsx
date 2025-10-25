import { Profile } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SelectLabel from "../../atoms/select-label/select-label";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    profiles: Profile[];
}

export default function NewEventForm({ onSubmit, profiles, onCancel }: Props) {
    return(
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Nuevo evento"/>
            <div className={style.content}>
                <InputLabel 
                    id="title"
                    placeholder="Título"
                    required
                    type="text"
                    label="Título"
                />
            </div>
            <div className={style.content}>
                <InputLabel 
                    id="content"
                    placeholder="Contenido"
                    required
                    type="text"
                    label="Contenido"
                />
            </div>
            <div className={style.content}>
                <SingleImageInput 
                    id="eventImage"
                    value={null}
                    fallbackText="Mantener imágen actual"
                />
            </div>
            <div className={style.dateContainer}>
                <InputLabel 
                    id="fechaInicio"
                    placeholder="Fecha de Inicio"
                    required
                    type="date"
                    label="Fecha de Inicio"   
                />
                <InputLabel 
                    id="fechaFin"
                    placeholder="Fecha de Fin"
                    required
                    type="date"
                    label="Fecha de Fin"   
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
            <MainButton enabled text="Publicar evento" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )

}