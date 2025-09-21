import Chip from "../../atoms/chip/chip";
import style from "./style.module.css"

type Props = {
    styles:string[];
}

export default function StylesList({styles}: Props) {
    return(
        <div className={style.container}>
            {styles.map((styleMusic) => (
                <div                     
                    key={styleMusic}
                    className={style.chip}
                >
                    <Chip 
                        label={styleMusic}
                    />

                </div>
            ))}
        </div>
    )
}