import CatalogTable from "../../molecules/catalog-table/catalog-table";
import style from "./style.module.css";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import Modal from "../../molecules/modal/modal";

type Props = {
    title: string;
    items: Array<any>;
    onClickOnAddItem:() => void;
    onClickOnDeleteItem: (item: any) => void;
    onClickOnEditItem: (item: any) => void;
}

export default function ManageCatalogSection( { 
    title, items, onClickOnAddItem, onClickOnDeleteItem, onClickOnEditItem 
}: Props) {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <LargeTitle text={title}/>
            </div>
            <div className={style.sectionContent} >
                <MainButton
                    enabled
                    text="+ Nuevo"
                    type="button"
                    onClick={onClickOnAddItem}
                    modifier={style.newItemButton}
                />
                <CatalogTable
                    items={items}
                    onDelete={onClickOnDeleteItem}
                    onEdit={onClickOnEditItem}
                />
            </div>
        </div>
    )
}