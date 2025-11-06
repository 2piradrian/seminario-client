import { Event } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import SingleImageInput from "../../atoms/single-image-input/single-image-input";
import style from "./style.module.css";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    event: Event; 
}

export default function EditEventForm({ onSubmit, onCancel, event }: Props) {
    return(
        <form className={style.container} onSubmit={onSubmit}>
            <LargeTitle text="Editar evento"/>
            <div className={style.content}>
                <InputLabel 
                    id="title"
                    placeholder="Título"
                    required
                    type="text"
                    label="Título"
                    value={event?.title}
                />
            </div>
            <div className={style.content}>
                <InputLabel 
                    id="content"
                    placeholder="Contenido"
                    required
                    type="text"
                    label="Contenido"
                    value={event?.content}
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
                    id="dateInit"
                    placeholder="Fecha de Inicio"
                    required
                    type="date"
                    label="Fecha de Inicio"   
                    value={event?.dateInit ? event.dateInit.toISOString().split("T")[0] : ""}
                />
                <InputLabel 
                    id="dateEnd"
                    placeholder="Fecha de Fin"
                    required
                    type="date"
                    label="Fecha de Fin" 
                    value={event?.dateEnd ? event.dateEnd.toISOString().split("T")[0] : ""} 
                />
            </div>
            <MainButton enabled text="Guardar cambios" type="submit" />
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel} />
        </form>
    )

}