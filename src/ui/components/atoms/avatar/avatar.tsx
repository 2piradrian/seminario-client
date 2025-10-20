import { ImageHelper } from "../../../../core"
import type { Profile } from "../../../../domain";
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css";

type Props = {
    profile: Profile;
    onClick: () => void;
    hideName?: boolean;
}

export default function Avatar({ profile, onClick, hideName }: Props) {

    return(
        <div className={style.container} onClick={onClick}>
            <img 
                src={ImageHelper.buildRoute(profile.profileImage) || noImage} 
                alt="profile image" 
                className={style.profileImage} 
                onError={(e) => { e.currentTarget.src = noImage }}
            />
            {!hideName && (
                <div className={style.section}>
                    <span className={style.text}>{profile.displayName}</span>
                </div>

            )}
        </div>
    )

}