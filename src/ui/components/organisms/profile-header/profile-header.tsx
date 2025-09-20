import camera from "../../../assets/icons/camera.svg"
import noImage from "../../../assets/other/no-image.png"
import style from "./style.module.css"

export default function ProfileHeader(){
    return(
        <div className={style.container}>
            <div className={style.portraitContainer}>
                <img src={noImage} alt="" className={style.portrait} />
                <img src={camera} alt=""  className={style.cameraIcon}/>
            </div>
        </div>
    )
}