import style from "./style.module.css";

type Props = {
    title: string;
}

export default function CatalogItem( { title }: Props) {
    return (
        <div className={style.container}>
            <h2>{title}</h2>
        </div>
    )
}