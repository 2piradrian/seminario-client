import SmallTitle from "../small-title/small-title";
import styles from "./style.module.css";

export default function NoResults() {
    return (
        <div className={styles.container}>
            <SmallTitle text="No se encontraron resultados en la búsqueda." />
        </div>
    );
}