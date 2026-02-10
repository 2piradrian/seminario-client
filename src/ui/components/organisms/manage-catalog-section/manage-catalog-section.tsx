import CatalogTable from "../../molecules/catalog-table/catalog-table";
import style from "./style.module.css";
import LargeTitle from "../../atoms/large-title/large-title";
import MainButton from "../../atoms/main-button/main-button";
import { CatalogForm } from "../../molecules/catalog-form/catalog-form";

type Props = {
    title: string;
    items: Array<any>;
    onClickOnAddItem:() => void;
    onClickOnDeleteItem: (item: any) => void;
    onClickOnEditItem: (item: any) => void;

    itemToEdit: any;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleCancel: () => void;
    itemText: string;
    isFormOpen: boolean;
}

export default function ManageCatalogSection( { 
    title, items, onClickOnAddItem, onClickOnDeleteItem, onClickOnEditItem, itemToEdit, handleCancel, handleSubmit, isFormOpen, 
    itemText
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
                {isFormOpen && (
                    <CatalogForm
                        item={itemToEdit}
                        itemText={itemText}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}