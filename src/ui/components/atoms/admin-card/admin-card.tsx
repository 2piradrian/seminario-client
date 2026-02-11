import MediumTitle from "../medium-title/medium-title";
import SmallTitle from "../small-title/small-title";
import style from "./style.module.css";

type Props = {
	src: string;
	onClick: () => void;
	title: string;
	description: string;
	alt: string;
};

export default function AdminCard({
	src,
	alt,
	onClick,
	title,
	description,
}: Props) {
	return (
		<div className={style.card} onClick={onClick}>
			<div className={style.imgContainer}>
				<img src={src} alt={alt} className={style.illustration}/>
			</div>
			<div className={style.content}>
				<h2 className={style.title}>{title}</h2>
				<p className={style.description}>{description}</p>
				<button className={style.button}>Ir →</button>
			</div>
		</div>
	);
}
