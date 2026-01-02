import { Profile, type User } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";

type Props = {
    profile: Profile;
    onClick?: (profileId: string) => void;
};

export default function ProfileSimpleItem({ profile, onClick }: Props) {
	return (
		<div
		className={style.container}
		onClick={onClick ? () => onClick(profile.id) : undefined}
		>
			<Avatar profile={profile} hideName={false} />
		</div>
	);
}
