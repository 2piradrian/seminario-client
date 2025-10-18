import { type UserProfile } from "../../../../domain";
import style from "./style.module.css";
import ProfileCard from "../../molecules/profile-card/profile-card";

type Props = {
  activeProfile: UserProfile;
  onProfileClick: (profileId: string) => void;
};

export default function MainFeed({ activeProfile, onProfileClick }: Props) {
  return (
    <div className={style.container}>
      <ProfileCard
        profile={activeProfile}
        onClickOnAvatar={() => onProfileClick(activeProfile.id)}
      />
    </div>
  );
}
