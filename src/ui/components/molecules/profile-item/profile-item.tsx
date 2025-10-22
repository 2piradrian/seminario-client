import type { Profile } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import MainIconButton from "../../atoms/main-icon-button/main-icon-button";
import SecondaryIconButton from "../../atoms/secondary-icon-button/secondary-icon-button";
import followIcon from "../../../assets/icons/followIcon.svg";
import unfollow from "../../../assets/icons/unfollow.svg";
import style from "./style.module.css";

type Props = {
    profile: Profile;
    onClickOnAvatar: () => void;
    isFollowing: boolean;
    onClick: () => void;
    currentUserId?: string;
    showDescription?: boolean;
};

export default function ProfileItem({
    profile,
    onClickOnAvatar,
    isFollowing,
    onClick,
    showDescription,
    currentUserId
}: Props) {
    return (
        <div className={style.container}>
            <div className={style.profileInfo}>
                <Avatar profile={profile} onClick={onClickOnAvatar} />
                {showDescription &&(
                    <p className={style.shortDescription}>{profile.shortDescription}</p>
                )} 
            </div>
            
            {profile.id !== currentUserId && (
                <div className={style.buttonContainer}>
                    {isFollowing ? (
                        <SecondaryIconButton
                            text="Siguiendo"
                            type="button"
                            enabled={true}
                            onClick={onClick}
                            icon={unfollow}
                            modifier={style.followButton}
                        />
                    ) : (
                        <MainIconButton
                            text="Seguir"
                            type="button"
                            enabled={true}
                            onClick={onClick}
                            icon={followIcon}
                            modifier={style.followButton}
                        />
                    )}
                </div>
        )}
        </div>
    );
}