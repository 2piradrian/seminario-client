import SearchResultCard from "../search-result-card/search-result-card";
import userIcon from "../../../assets/icons/person.svg";
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
        <SearchResultCard
            id={user.id}
            title={user.toProfile().displayName}
            description={user.toProfile().shortDescription}
            badgeLabel="Usuario"
            badgeIcon={userIcon}
            imageId={user.toProfile().profileImage}
            meta={[
                user.profile?.followersQuantity !== undefined
                    ? `${user.profile.followersQuantity} seguidores`
                    : undefined
            ].filter(Boolean)}
            onAction={() => onViewProfile(user.toProfile())}
            secondaryLabel={
                user.profile?.isOwnProfile
                    ? undefined
                    : (user.toProfile().isFollowing ? "Siguiendo" : "Seguir")
            }
            isSecondaryActive={user.toProfile().isFollowing}
            onSecondary={
                user.profile?.isOwnProfile
                    ? undefined
                    : () => onToggleFollow(user.toProfile())
            }
        />
    );
}
