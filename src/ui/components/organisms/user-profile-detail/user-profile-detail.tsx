import { Optionable, PageProfile, type UserProfile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ChipList from "../../molecules/chip-list/chip-list";
import style from "./style.module.css"

type Props = {
    profile: UserProfile;
    pagesProfiles: PageProfile[];
    onClickOnPage: (pageId: string) => void;
}

export default function UserProfileDetail({ 
    profile, 
    pagesProfiles,
    onClickOnPage
}: Props) {
    return(
        <div className={style.container}>
            <div className={style.detail}>
                <MediumTitle text="Detalles"/>
                <p className={style.text}>{profile.longDescription}</p>
            </div>
            <div className={style.lists}>
                <MediumTitle text="Instrumentos"/>
                {  
                profile.instruments.length === 0 ?
                    <p className={style.text}>No hay instrumentos registrados</p> : 
                    <ChipList list={Optionable.mapToNames(profile.instruments)}/>
                }
                <MediumTitle text="Estilos musicales"/>
                {
                profile.styles.length === 0 ?
                    <p className={style.text}>No hay estilos registrados</p> :
                    <ChipList list={Optionable.mapToNames(profile.styles)}/>
                }
            </div>
            <div className={style.members}>
                <MediumTitle text="Páginas relacionadas" />
                {pagesProfiles.length === 0 ? (
                        <p className={style.text}>No hay páginas</p>
                    ) : (
                        <ul className={style.memberList}>
                            {pagesProfiles.map(page => {
                                return (
                                    <li key={page.id}>
                                        <Avatar
                                            profile={page.toProfile()}
                                            onClick={() => onClickOnPage(page.id)}
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
