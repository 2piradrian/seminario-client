import MainIconButton from "../../atoms/main-icon-button/main-icon-button"
import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button"
import followIcon from "../../../assets/icons/followIcon.svg"
import unfollow from "../../../assets/icons/unfollow.svg"
import edit from "../../../assets/icons/edit.svg"
import userNull from "../../../assets/icons/userNull.svg"
import noImage from "../../../assets/other/no-image.png"
import chatMessage from "../../../assets/icons/chat.svg"
import MediumTitle from "../../atoms/medium-title/medium-title"
import { ImageHelper } from "../../../../core"
import { Profile } from "../../../../domain"
import FollowCounter from "../../atoms/follow-counters/follow-counters"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"
import DestructiveButton from "../../atoms/destructive-button/destructive-button"
import Modal from "../../molecules/modal/modal"

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
    onClickOnDeletePage?: () => void;
    onCLickOnLeavePage?: () => void;
    cancelLeave?: () => void,
    cancelDeletePage?: () => void,
    proceedLeave?: () => void,
    proceedDeletePage?: () => void,
    isLeaveOpen?: boolean,
    isDeletePageOpen?: boolean,
    onClick?: () => void;
    onClickOnCalendar: () => void;
    onClickOnChat?: () => void;
    isPage?: boolean;
    isMember?: boolean;
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
    onClickOnDeletePage,
    onCLickOnLeavePage,
    onClick,
    onClickOnCalendar,
    onClickOnChat,
    cancelDeletePage,
    cancelLeave,
    proceedDeletePage,
    proceedLeave,
    isDeletePageOpen,
    isLeaveOpen,
    isPage,
    isMember
}: Props) {

    return (
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
                {!ownProfile && !isPage && (
                    <div className={style.chatButton}>
                        <img
                            src={chatMessage}
                            alt="Chat icon"
                            className={style.chatIcon}
                            onClick={onClickOnChat}
                        />
                    </div>
                )}
                <div className={style.buttonContainer}>
                    {ownProfile ? (
                        <>
                            <MainIconButton
                                text={isPage ? "Editar Página" : "Modificar Perfil"}
                                type="button"
                                enabled={true}
                                onClick={onClickOnEditProfile}
                                icon={edit}
                            />
                            {!isPage && (
                                <SecondaryButton
                                    text="Crear Página"
                                    type="button"
                                    enabled={true}
                                    onClick={onClickOnCreatePage}
                                />
                            )}
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
                        )
                    }
                    <SecondaryButton
                        text="Ver Calendario"
                        type="button"
                        enabled={true}
                        onClick={onClickOnCalendar}
                    />
                    {isPage && isMember && (

                        ownProfile ? (
                            <DestructiveButton
                                text="Eliminar pagina"
                                type="button"
                                onClick={onClickOnDeletePage}
                            />

                        ) : (
                            <DestructiveButton
                                text="Salir"
                                type="button"
                                onClick={onCLickOnLeavePage}
                            />
                        )
                    )}
                </div>
            </div>

            {isDeletePageOpen && (
                <Modal
                    title={"¿Estas seguro de eliminar esta pagina?"}
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDeletePage}
                    onProceed={proceedDeletePage}
                />
            )}
            {isLeaveOpen && (
                <Modal
                    title={"¿Estas seguro de salir de esta pagina?"}
                    description="Esta acción no se puede deshacer"
                    cancelText="Quedarse"
                    deleteText="Salir"
                    onCancel={cancelLeave}
                    onProceed={proceedLeave}
                />
            )}
        </div>
    )
}
