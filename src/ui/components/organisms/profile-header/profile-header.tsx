import MainIconButton from "../../atoms/main-icon-button/main-icon-button"
import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button"
import followIcon from "../../../assets/icons/followIcon.svg"
import unfollow from "../../../assets/icons/unfollow.svg"
import edit from "../../../assets/icons/edit.svg"
import userNull from "../../../assets/icons/userNull.svg"
import noImage from "../../../assets/other/no-image.png"
import MediumTitle from "../../atoms/medium-title/medium-title"
import { ImageHelper } from "../../../../core"
import type { Profile } from "../../../../domain"
import FollowCounter from "../../atoms/follow-counters/follow-counters"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
    profile: Profile;
    ownProfile: boolean; 
    isFollowing: boolean;
    followersQuantity: number;
    onFollowersClick: () => void;
    followingQuantity?: number;
    onFollowingClick?: () => void;
    onClickOnEditProfile: () => void;
    onClickOnCreatePost?: () => void;
    onClickOnCreatePage?: () => void;
    onClick?: () => void;
    onClickOnCalendar: () => void;
    onClickOnChat: () => void;
};

export default function ProfileHeader({
    profile,
    ownProfile,
    isFollowing,
    followersQuantity,
    onFollowersClick,
    followingQuantity,
    onFollowingClick,
    onClickOnEditProfile,
    onClickOnCreatePage,
    onClick,
    onClickOnCalendar,
    onClickOnChat
}: Props){
    
    return(
        <div className={style.container}>
            <div className={style.portraitContainer}>
                <img 
                    src={ImageHelper.buildRoute(profile.portraitImage) || noImage} 
                    alt="portrait" 
                    className={style.portrait} 
                    onError={(e) => { e.currentTarget.src = noImage }}
                />
            </div>
            <div className={style.profile}>
                <img 
                    src={ImageHelper.buildRoute(profile.profileImage) || userNull} 
                    alt="avatar" 
                    className={style.avatar}
                    onError={(e) => { e.currentTarget.src = userNull }}
                />
                <div className={style.info}>
                        <MediumTitle text={profile.displayName} />
                        <FollowCounter 
                            followersQuantity={followersQuantity} 
                            followingQuantity={followingQuantity} 
                            onFollowersClick={onFollowersClick} 
                            onFollowingClick={onFollowingClick}
                        />
                        <p>{profile.shortDescription}</p>
                </div>
                <div className={style.chatButton}>
                    !ownProfile ? (
                        <>
                            <SecondaryButton 
                            text="Enviar mensaje"
                            type="button"
                            enabled={true}
                            onClick={onClickOnChat} 
                        />
                        </> 
                    )
                </div>
                <div className={style.buttonContainer}>
                    { ownProfile ? (
                        <>
                            <MainIconButton
                                text="Modificar Perfil"
                                type="button"
                                enabled={true}
                                onClick={onClickOnEditProfile}
                                icon={edit} 
                            />
                            <SecondaryButton
                                text="Crear Página"
                                type="button"
                                enabled={true}
                                onClick={onClickOnCreatePage} 
                            />
                        </>
                        
                    ) :     
                    ( 
                        isFollowing ? (
                        <SecondaryIconButton
                            text="Siguiendo"
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
                    <SecondaryButton
                        text="Ver Calendario"
                        type="button"
                        enabled={true}
                        onClick={onClickOnCalendar}
                    />
                </div>
            </div>
        </div>
    )
}
