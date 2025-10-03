import { Profile, type Page } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import style from "./style.module.css"

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
                    <ul className={style.memberList}>
                        {page.members.map((member) => (
                            <li key={member.id} className={style.text}>
                                {Profile.fromEntity(member).displayName}
                            </li> 
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
    
}