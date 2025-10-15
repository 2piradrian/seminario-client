import style from "./style.module.css";

type Props = {
    followersCount: number;
    followingCount: number;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
}

export default function FollowCounter({followersCount, followingCount, onFollowersClick, onFollowingClick}: Props) {
    return(
        <div className={style.container}>
            <div onClick={onFollowersClick} className={style.button}> 
                <span className={style.counters}>{followersCount}</span>
                <p>Seguidores</p>
            </div> 
            <div onClick={onFollowingClick} className={style.button}>
                <span className={style.counters}>{followingCount}</span>
                <p>Siguiendo</p>
            </div>
        </div>
    )
}