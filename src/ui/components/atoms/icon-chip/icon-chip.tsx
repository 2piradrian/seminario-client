import style from "./style.module.css"

type Props = {
    icon: string;
    label: string;

};

export default function IconChip({ icon, label }:Props) {
    return(
        <div className={style.container}>
            <img src={icon} alt={"Icon " + label} className={style.icon} />
            <p>{label}</p>
        </div>
    )
}