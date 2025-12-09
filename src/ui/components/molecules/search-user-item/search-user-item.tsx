import SmallTitle from "../../atoms/small-title/small-title";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import Avatar from "../../atoms/avatar/avatar";
import userIcon from "../../../assets/icons/person.svg";
import style from "./style.module.css";
import type { Profile, User } from "../../../../domain";

type Props = {
    user: User;
    onViewProfile: (profile: Profile) => void;
    onToggleFollow: (profile: Profile) => void;
};

export default function SearchUserItem({
    user,
    onViewProfile,
    onToggleFollow
}: Props) {
    return (
        <div className={style.item}>
            <article
                className={style.card}
                onClick={() => onViewProfile(user.toProfile())}
            >
                <div className={style.media}>
                    {user.toProfile().profileImage ? (
                        <div className={style.avatar}>
                            <Avatar profile={user.toProfile()} hideName />
                        </div>
                    ) : (
                        <div className={style.placeholder}>
                            <span>{user.toProfile().displayName?.charAt(0) ?? "?"}</span>
                        </div>
                    )}
                </div>

                <div className={style.content}>
                    <div className={style.header}>
                        <div className={style.titleBlock}>
                            <div className={style.titleRow}>
                                <SmallTitle text={user.toProfile().displayName} />
                                <span className={style.badge}>
                                    <img src={userIcon} alt="" className={style.badgeIcon} />
                                    <span className={style.badgeLabel}>Usuario</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {user.toProfile().shortDescription && (
                        <p className={style.description}>{user.toProfile().shortDescription}</p>
                    )}
                    <div className={style.info}>
                        {user.profile?.followersQuantity !== undefined && (
                            <span className={style.infoItem}>
                                {`${user.profile.followersQuantity} seguidores`}
                            </span>
                        )}
                    </div>
                </div>

                {!user.profile?.isOwnProfile && (
                    <div
                        className={style.actions}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SecondaryButton
                            text={user.toProfile().isFollowing ? "Siguiendo" : "Seguir"}
                            type="button"
                            enabled={true}
                            onClick={() => onToggleFollow(user.toProfile())}
                            modifier={`${style.button} ${style.secondaryCta} ${user.toProfile().isFollowing ? style.secondaryActive : style.secondaryPrimary}`}
                        />
                    </div>
                )}
            </article>
        </div>
    );
}
