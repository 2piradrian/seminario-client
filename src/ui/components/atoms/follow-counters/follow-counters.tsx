import style from "./style.module.css";

type Props = {
    followersQuantity: number;
    followingQuantity: number;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
}

export default function FollowCounter({followersQuantity, followingQuantity, onFollowersClick, onFollowingClick}: Props) {
    return(
        <div className={style.container}>
            <div onClick={onFollowersClick} className={style.button}> 
                <span className={style.counters}>{followersQuantity}</span>
                <p>Seguidores</p>
            </div> 
        {followingQuantity !== null && followingQuantity !== undefined &&
            <div onClick={onFollowingClick} className={style.button}>
                <span className={style.counters}>{followingQuantity}</span>
                <p>Siguiendo</p>
            </div>
        }
        </div>
    )
}