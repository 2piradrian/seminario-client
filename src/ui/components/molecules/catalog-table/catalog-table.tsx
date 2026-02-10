import NoResults from "../../atoms/no-results/no-results";
import deleteIcon from "../../../assets/icons/trash-catalog.svg";
import editIcon from "../../../assets/icons/edit-catalog.svg";
import style from "./style.module.css";
import IconButton from "../../atoms/main-icon-button/main-icon-button";

type Props = {
    items: Array<any>;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
};

export default function CatalogTable({ items, onEdit, onDelete }: Props) {
    return (
        <div className={style.container}>
        <table className={style.table}>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td>

                <td className={style.actions}>
                    <img
                        src={editIcon}
                        alt="Editar"
                        onClick={() => onEdit(item)}
                        className={style.icon}
                    />
                    <img
                        src={deleteIcon}
                        alt="Borrar"
                        onClick={() => onDelete(item)}
                        className={style.icon}
                    />
                </td>
                </tr>
            ))}

            </tbody>
        </table>
        </div>
    );
}
