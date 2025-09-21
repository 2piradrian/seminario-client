import Chip from "../../atoms/chip/chip";
import style from "./style.module.css"

type Props = {
    instruments:string[];
}

export default function InstrumentsList({instruments}: Props) {
    return(
        <div className={style.container}>
            {instruments.map((instrument) => (
                <div                     
                    key={instrument}
                    className={style.chip}
                >
                    <Chip 
                        label={instrument}
                    />

                </div>
            ))}
        </div>
    )
}