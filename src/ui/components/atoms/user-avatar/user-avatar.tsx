import { ImageHelper } from "../../../../core"
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css";

type Props = {
    profileImage: string;
    name: string;
    surname: string;
}

export default function UserAvatar( {profileImage, name, surname }: Props) {
    
    return(
        <div>
            <img 
                src={ImageHelper.buildRoute(profileImage) || noImage} 
                alt="profile image" 
                className={style.portrait} 
                onError={(e) => { e.currentTarget.src = noImage }}
                />

            <div className={style.section}>
                <span className={style.text}>{name}</span>
                <span className={style.text}>{surname}</span>
            </div>
        </div>
        
    )

}