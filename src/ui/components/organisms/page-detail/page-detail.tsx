import { Profile, type PageProfile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import MediumTitle from "../../atoms/medium-title/medium-title";
import style from "./style.module.css"

type Props = {
    page: PageProfile
    onClickOnMember: (profileId: string) => void;
}

export default function PageDetail({ 
    page,
    onClickOnMember
 }:Props) {

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
                    ) : (
                        <ul className={style.memberList}>
                            {page.members.map(member => {
                                return (
                                    <li key={member.id}>
                                        <Avatar
                                            profile={member.toProfile()}
                                            onClick={() => onClickOnMember(member.id)}
                                            hideName
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
            </div>
        </div>
    )
    
}