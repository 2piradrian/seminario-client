import InstrumentsList from "../../molecules/instruments-list/instruments-list";
import StylesList from "../../molecules/styles-list/styles-list";
import style from "./style.module.css"

export default function ProfileDetail() {
      const instruments = ["Guitarra", "Bajo", "Batería", "Teclado", "trompeta", "saxofon", "xilofon"];
      const styles = ["Jazz", "Rock", "Indie", "Blues", "Pop", "Pop-Rock", "Cuarteto"]

    return(
        <div className={style.container}>
            <h3>Detail</h3>
            <p className={style.text}>Soy musico argentino. AGUANTE LA RENGA</p>
            <StylesList styles={styles}  />
            <InstrumentsList instruments={instruments}/>
        </div>
    )
}