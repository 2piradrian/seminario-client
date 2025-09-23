import noImage from "../../../assets/other/no-image.png"
import MainIconButton from "../../atoms/main-icon-button/main-icon-button"
import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button"
import userNull from "../../../assets/icons/userNull.svg"
import followIcon from "../../../assets/icons/followIcon.svg"
import unfollow from "../../../assets/icons/unfollow.svg"
import edit from "../../../assets/icons/edit.svg"
import style from "./style.module.css"
import type { UserProfile } from "../../../../domain"

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
                <img src={noImage} alt="" className={style.portrait} />
            </div>
            <div className={style.profile}>
                <img 
                    src={userNull} 
                    alt=" " 
                    className={style.avatar}/>
                <div className={style.info}>
                    <div className={style.text}>
                        <h2>Usuario</h2>
                        <p>musician</p>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    {ownProfile ? (
                    <MainIconButton 
                        text="Modificar Perfil"
                        type="button"
                        enabled={true}
                        onClick={onClick}
                        icon={edit}
                    />
                    ) : (
                        isFollowing ? (
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
                    )
                )}

                </div>
            </div>
        </div>
    )
}