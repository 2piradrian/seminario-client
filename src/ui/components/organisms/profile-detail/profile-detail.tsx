import { Optionable, type UserProfile } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ChipList from "../../molecules/chip-list/chip-list";
import style from "./style.module.css"

type Props = {
    profile: UserProfile;
}

export default function ProfileDetail({ profile }: Props) {

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
        </div>
    )
}