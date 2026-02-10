import style from "./style.module.css";

type Props = {
    title: string;
    onClick: () => {};
}

export default function CatalogItem( { title, onClick }: Props) {
    return (
        <div className={style.container} onClick={onClick}>
            <h2>{title}</h2>
        </div>
    )
}