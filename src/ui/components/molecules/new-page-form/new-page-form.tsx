import { Optionable, type PageType } from "../../../../domain"
import InputLabel from "../../atoms/input-label/input-label"
import LargeTitle from "../../atoms/large-title/large-title"
import MainButton from "../../atoms/main-button/main-button"
import MediumTitle from "../../atoms/medium-title/medium-title"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import SelectLabel from "../../atoms/select-label/select-label"
import style from "./style.module.css"

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onCancel: () => void
    pageTypes: PageType[]
}
export default function NewPageForm({
    onSubmit, onCancel, pageTypes,
}: Props){
    return (
        <form onSubmit={onSubmit} className={style.container} noValidate>
            <LargeTitle text="Crear Página"/>
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
                <div className={style.section}>
                    <SelectLabel
                        id="pageType"
                        label="Tipo de página"
                        value={""}
                        values={["Seleccionar", ...Optionable.mapToNames(pageTypes)]}
                    />
                </div>
            </div>
            <MainButton enabled text="Crear página" type="submit"/>
            <SecondaryButton enabled text="Cancelar" type="button" onClick={onCancel}/>
        </form>
    )
}
