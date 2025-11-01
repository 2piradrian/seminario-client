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
import comment from "../../../assets/icons/comment.svg"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
    profile: Profile;
    ownProfile: boolean; 
    isFollowing: boolean;
    followersCount: number;
    onFollowersClick: () => void;
    followingCount?: number;
    onFollowingClick?: () => void;
    onClickOnEditProfile: () => void;
    onClickOnCreatePost?: () => void;
    onClickOnCreatePage?: () => void;
    onClick?: () => void;
};

export default function ProfileHeader({
    profile,
    ownProfile,
    isFollowing,
    followersCount,
    onFollowersClick,
    followingCount,
    onFollowingClick,
    onClickOnEditProfile,
    onClickOnCreatePost,
    onClickOnCreatePage,
    onClick
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
                            followersCount={followersCount} 
                            followingCount={followingCount} 
                            onFollowersClick={onFollowersClick} 
                            onFollowingClick={onFollowingClick}
                        />
                        <p>{profile.shortDescription}</p>
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
                            <MainIconButton
                                text="Crear Post"
                                type="button"
                                enabled={true}
                                onClick={onClickOnCreatePost}
                                icon={comment} 
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
                </div>
            </div>
        </div>
    )
}
