import CatalogItem from "../../atoms/catalog-item/catalog-item";
import style from "./style.module.css";

type Props = {
    items: string[];
};

export default function CatalogList({ items }: Props) {
    return (
        <div className={style.listContainer}>
            {items.map((item, index) => (
                <CatalogItem
                    key={index}
                    title={item}
                />
            ))}
        </div>
    );
}
