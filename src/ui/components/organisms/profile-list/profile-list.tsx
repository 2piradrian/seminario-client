import type { Profile } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ProfileItem from "../../molecules/profile-item/profile-item";
import style from "./style.module.css";

type Props = {
    profiles: Profile[];
    onClickOnProfile: (profile: Profile) => void;
    toggleFollow: (profile) => void;
    currentUserId?: string;
    title?: string;
    showDescription?: boolean;
};

export default function ProfileList({ 
    profiles, 
    onClickOnProfile, 
    toggleFollow, 
    currentUserId,
    title, 
    showDescription 
}: Props) {
    return (
        <section className={style.container}>
            <MediumTitle text={title} />
            {profiles.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    {profiles.map((profile) => (
                        <ProfileItem 
                            key={profile.id}
                            profile={profile} 
                            onClickOnAvatar={() => onClickOnProfile(profile)}
                            isFollowing={profile.isFollowing}
                            onClick={() => toggleFollow(profile)}
                            showDescription={showDescription}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
