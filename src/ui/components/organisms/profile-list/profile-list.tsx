import type { Profile } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ProfileItem from "../../molecules/profile-item/profile-item";
import style from "./style.module.css";

type Props = {
    title?: string;
    profiles: Profile[];
    showDescription?: boolean;
    toggleFollow: (profile) => void;
    onClickOnProfile: (profile: Profile) => void;
    currentUserId?: string;
};

export default function ProfileList({ profiles, title, toggleFollow,onClickOnProfile, showDescription, currentUserId }: Props) {
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
