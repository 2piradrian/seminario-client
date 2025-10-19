import loading from "../../../assets/other/loading.gif";
import SmallTitle from "../small-title/small-title";
import style from "./style.module.css"

export default function Loading() {
    return(
        <div className={style.container}>
            <img className={style.image} src={loading} alt="Cargando" />
            <SmallTitle text="Cargando..." />
        </div>
    );
}