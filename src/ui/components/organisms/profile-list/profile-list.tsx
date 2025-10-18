import {UserProfile, type Profile } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ProfileItem from "../../molecules/profile-item/profile-item";
import style from "./style.module.css";

type Props = {
    title: string;
    profiles: Profile[];
    toggleFollow: () => void;
};

export default function ProfileList({ profiles, title, toggleFollow }: Props) {
    return (
        <section className={style.container}>
            <MediumTitle text={title} />
            {profiles.length === 0 ? (
                <span className={style.noResultsMessage} >No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    {profiles.map((profile) => (
                        <ProfileItem 
                            key={profile.id}
                            profile={profile} 
                            onClickOnAvatar={() => {}}
                            isFollowing={false}
                            onClick={() => toggleFollow()}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
