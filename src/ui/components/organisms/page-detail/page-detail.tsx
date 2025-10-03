import type { Page } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
//import style from "./style.module.css"

type Props = {
    page: Page
}

export default function PageDetail({ page }: Props) {

    return(
        <div className={style.container}>
            <div className={style.detail}>
                <MediumTitle text="Detalles"/>
                <p className={style.text}>{page.longDescription}</p>
            </div>
            <div className={style.members}>
                <MediumTitle text="Miembros" />
                {page.members.length === 0 ? (
                    <p className={style.text}>No hay miembros</p>
                ): (
                    <p className={style.text}>
                        {page.members.length} {page.members.length === 1 ? "miembro" : "miembros"}
                    </p>
                )}

            </div>
        </div>
    )
    
}