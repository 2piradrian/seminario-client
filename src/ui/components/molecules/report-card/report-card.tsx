import SmallTitle from "../../atoms/small-title/small-title";
import style from "./style.module.css";

type Props = {
    title: string;
    description: string;
    src: string;
}

export default function ReportCard( { title, description, src }: Props ) {
    return (
        <div className={style.card}>
            <div
                className={style.icon}
                style={{ backgroundImage: `url(${src})` }}
            />
			<div className={style.content}>
				<SmallTitle text={title} />
                <p className={style.description}>{description}</p>
			</div>
		</div>
    )
}