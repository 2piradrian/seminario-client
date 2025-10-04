import { ImageHelper } from "../../../../core"
import type { Profile } from "../../../../domain";
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css";

type Props = {
    profile: Profile
    onClick: () => void;
}

export default function UserAvatar({ profile, onClick }: Props) {

    return(
        <div className={style.container} onClick={onClick}>
            <img 
                src={ImageHelper.buildRoute(profile.profileImage) || noImage} 
                alt="profile image" 
                className={style.portrait} 
                onError={(e) => { e.currentTarget.src = noImage }}
            />
            <div className={style.section}>
                <span className={style.text}>{profile.displayName}</span>
            </div>
        </div>
    )

}