import camera from "../../../assets/icons/camera.svg"
import noImage from "../../../assets/other/no-image.png"
import IconButton from "../../atoms/icon-button/icon-button"
import userNull from "../../../assets/icons/userNull.svg"
import followIcon from "../../../assets/icons/followIcon.svg"
import edit from "../../../assets/icons/edit.svg"
import style from "./style.module.css"

type Props = {
    isFollowing: boolean;
    onClick: () => void;
    ownProfile: boolean;
};

export default function ProfileHeader({isFollowing, onClick, ownProfile}: Props){
    
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
                    {ownProfile ? (
                    <IconButton 
                        text="Modificar Perfil"
                        type="button"
                        enabled={true}
                        onClick={onClick}
                        icon={edit}
                    />
                    ) : (
                    <IconButton 
                        text={isFollowing ? "Dejar de seguir" : "Seguir"}
                        type="button"
                        enabled={true}
                        onClick={onClick}
                        icon={isFollowing ? "" : followIcon}
                    />
                    )}

                </div>
            </div>
        </div>
    )
}