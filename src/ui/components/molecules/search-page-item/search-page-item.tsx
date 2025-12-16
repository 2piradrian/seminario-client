import SmallTitle from "../../atoms/small-title/small-title";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import Avatar from "../../atoms/avatar/avatar";
import pageIcon from "../../../assets/icons/profile.svg";
import style from "./style.module.css";
import type { PageProfile, Profile } from "../../../../domain";

type Props = {
    page: PageProfile;
    onViewProfile: (profile: Profile) => void;
    onToggleFollow: (profile: Profile) => void;
};

export default function SearchPageItem({
    page,
    onViewProfile,
    onToggleFollow
}: Props) {
    return (
        <div className={style.item}>
            <article
                className={style.card}
                onClick={() => onViewProfile(page.toProfile())}
            >
                <div className={style.media}>
                    {page.profileImage ? (
                        <div className={style.avatar}>
                            <Avatar profile={page.toProfile()} hideName />
                        </div>
                    ) : (
                        <div className={style.placeholder}>
                            <span>{page.name?.charAt(0) ?? "?"}</span>
                        </div>
                    )}
                </div>

                <div className={style.content}>
                    <div className={style.header}>
                        <div className={style.titleBlock}>
                            <div className={style.titleRow}>
                                <SmallTitle text={page.name} />
                                <span className={style.badge}>
                                    <img src={pageIcon} alt="" className={style.badgeIcon} />
                                    <span className={style.badgeLabel}>Pagina</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {page.shortDescription && (
                        <p className={style.description}>{page.shortDescription}</p>
                    )}
                    <div className={style.info}>
                        {page.followersQuantity !== undefined && (
                            <span className={style.infoItem}>
                                {`${page.followersQuantity} seguidores`}
                            </span>
                        )}
                        {page.members?.length && (
                            <span className={style.infoItem}>
                                {`${page.members.length} miembros`}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className={style.actions}
                    onClick={(e) => e.stopPropagation()}
                >
                    <SecondaryButton
                        text={page.toProfile().isFollowing ? "Siguiendo" : "Seguir"}
                        type="button"
                        enabled={true}
                        onClick={() => onToggleFollow(page.toProfile())}
                        modifier={`${style.button} ${style.secondaryCta} ${page.toProfile().isFollowing ? style.secondaryActive : style.secondaryPrimary}`}
                    />
                </div>
            </article>
        </div>
    );
}
