import Chip from "../../atoms/chip/chip";
import style from "./style.module.css"

type Props = {
    list: string[];
}

export default function ChipList({ list }: Props) {
    return(
        <div className={style.container}>
            { list.map((item) => (
                <div key={item} className={style.chip}>
                    <Chip label={item} />
                </div>
            ))}
        </div>
    )
}