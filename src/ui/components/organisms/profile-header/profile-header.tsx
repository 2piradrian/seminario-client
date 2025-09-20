import camera from "../../../assets/icons/camera.svg"
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css"
import IconButton from "../../atoms/icon-button/icon-button"
import userNull from "../../../assets/icons/userNull.svg"
import followIcon from "../../../assets/icons/followIcon.svg"
import { useState } from "react"

type Props = {

    isFollowing: boolean;
};

export default function ProfileHeader({isFollowing: initialIsFollowiing,}: Props){
    const [isFollowing, setIsFollowing] = useState(initialIsFollowiing);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };
    return(
        <div className={style.container}>
            <div className={style.portraitContainer}>
                <img src={noImage} alt="" className={style.portrait} />
                <img src={camera} alt=""  className={style.cameraIcon}/>
            </div>
            <div className={style.profile}>
                <img 
                    src={userNull} 
                    alt=" " 
                    className={style.avatar}/>
                <div className={style.info}>
                    <div className={style.text}>
                        <h2>Usuario</h2>
                        <p>musican</p>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <IconButton 
                        text={isFollowing ? "Dejar de seguir" : "Seguir"}
                        type="button"
                        enabled={true}
                        onClick={toggleFollow}
                        icon={isFollowing ? "" : `${followIcon}`}
                    />
                </div>
            </div>
        </div>
    )
}