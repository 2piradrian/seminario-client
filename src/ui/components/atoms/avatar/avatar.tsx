import { ImageHelper } from "../../../../core"
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css";

type Props = {
    profileImage: string;
    displayName: string;
    onClick: () => void;
}

export default function UserAvatar({ profileImage, displayName, onClick }: Props) {
    
    return(
        <div className={style.container} onClick={onClick}>
            <img 
                src={ImageHelper.buildRoute(profileImage) || noImage} 
                alt="profile image" 
                className={style.portrait} 
                onError={(e) => { e.currentTarget.src = noImage }}
            />
            <div className={style.section}>
                <span className={style.text}>{displayName}</span>
            </div>
        </div>
    )

}