import type { Profile } from "../../../../domain";
import ProfileItem from "../../molecules/profile-item/profile-item";
import style from "./style.module.css";

type Props = {
    profiles: Profile[];
};

export default function ProfileList({ 
    profiles
    }: Props) {
    return (
        <section className={style.list}>
            {profiles.map((profile) => (
            <ProfileItem 
                profile={profile} 
                onClickOnAvatar={() => {}}
                isFollowing={false}
                onClick={() => {}}
            />
            ))}

        </section>
    )
}