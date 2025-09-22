import InstrumentsList from "../../molecules/instruments-list/instruments-list";
import StylesList from "../../molecules/styles-list/styles-list";
import style from "./style.module.css"

export default function ProfileDetail() {
      const instruments = ["Guitarra", "Bajo", "Batería", "Teclado", "trompeta", "saxofon", "xilofon"];
      const styles = ["Jazz", "Rock", "Indie", "Blues", "Pop", "Pop-Rock", "Cuarteto"]

    return(
        <div className={style.container}>
            <div className={style.detail}>
                <h3>Detail</h3>
                <p className={style.text}>Lorem ipsum dolor sit amet. Aut debitis animi ab optio nisi cum facilis dignissimos cum veniam similique sit possimus nemo ut expedita minima? </p>
            </div>
            <div className={style.lists}>
                <StylesList styles={styles}  />
                <InstrumentsList instruments={instruments}/>
            </div>
        </div>
    )
}