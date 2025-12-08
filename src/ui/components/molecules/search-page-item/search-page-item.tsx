import SearchResultCard from "../search-result-card/search-result-card";
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
    const profile = page.toProfile();

    return (
        <div className={style.item}>
            <SearchResultCard
                id={page.id}
                title={page.name}
                description={page.shortDescription}
                badgeLabel="Pagina"
                badgeIcon={pageIcon}
                imageId={page.profileImage}
                meta={[
                    page.followersQuantity !== undefined
                        ? `${page.followersQuantity} seguidores`
                        : undefined,
                    page.members?.length
                        ? `${page.members.length} miembros`
                        : undefined
                ].filter(Boolean)}
                onAction={() => onViewProfile(profile)}
                secondaryLabel={profile.isFollowing ? "Siguiendo" : "Seguir"}
                isSecondaryActive={profile.isFollowing}
                onSecondary={() => onToggleFollow(profile)}
            />
        </div>
    );
}
