import type { Profile, User } from "../../../../domain";
import ProfileSimpleItem from "../../molecules/profile-simple-item/profile-simple-item";
import style from "./style.module.css";

type Props = {
    profiles: Profile[];
    onClickOnProfile?: (profileId: string) => void;
};

export default function ProfileSimpleList( { profiles, onClickOnProfile }: Props ) {
    return (
        <section className={style.container}>

        {profiles.length === 0 ? (
            <span className={style.noResultsMessage}>No hay resultados.</span>
        ) : (
            <div className={style.list}>
                {profiles.map(profile => (
                    <ProfileSimpleItem
                        key={profile.id}
                        profile={profile}
                        onClick={onClickOnProfile ? () => onClickOnProfile(profile.id) : undefined}
                    />
                ))}
            </div>
        )}
        </section>
    );

}