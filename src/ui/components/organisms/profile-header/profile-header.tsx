import type { UserProfile } from "../../../../domain"
import MainIconButton from "../../atoms/main-icon-button/main-icon-button"
import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button"
import followIcon from "../../../assets/icons/followIcon.svg"
import unfollow from "../../../assets/icons/unfollow.svg"
import edit from "../../../assets/icons/edit.svg"
import userNull from "../../../assets/icons/userNull.svg"
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css"
import MediumTitle from "../../atoms/medium-title/medium-title"

type Props = {
    isFollowing: boolean;
    ownProfile: boolean;
    profile: UserProfile;
    onClick: () => void;
};

export default function ProfileHeader({isFollowing, onClick, profile, ownProfile}: Props){
    
    return(
        <div className={style.container}>
            <div className={style.portraitContainer}>
                <img 
                    src={profile.portraitImage || noImage} 
                    alt="portrait" 
                    className={style.portrait} 
                    onError={(e) => { e.currentTarget.src = noImage }}
                />
            </div>
            <div className={style.profile}>
                <img 
                    src={profile.profileImage || userNull} 
                    alt="avatar" 
                    className={style.avatar}
                    onError={(e) => { e.currentTarget.src = userNull }}
                />
                <div className={style.info}>
                    <div className={style.text}>
                        <MediumTitle text={`${profile.name} ${profile.surname}`} />
                        <p>{profile.shortDescription}</p>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    { ownProfile ? (
                        <MainIconButton 
                            text="Modificar Perfil"
                            type="button"
                            enabled={true}
                            onClick={onClick}
                            icon={edit}
                        />
                    ) : 
                    ( isFollowing ? (
                        <SecondaryIconButton
                            text="Dejar de seguir"
                            type="button"
                            enabled={true}
                            onClick={onClick}
                            icon={unfollow}
                        />
                    ) : (
                        <MainIconButton
                            text="Seguir"
                            type="button"
                            enabled={true}
                            onClick={onClick}
                            icon={followIcon}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}