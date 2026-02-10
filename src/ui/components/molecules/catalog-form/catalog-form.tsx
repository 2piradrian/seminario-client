import DestructiveButton from "../../atoms/destructive-button/destructive-button";
import InputLabel from "../../atoms/input-label/input-label";
import MainButton from "../../atoms/main-button/main-button";
import SmallTitle from "../../atoms/small-title/small-title";
import style from "./style.module.css";

type Props = {
    item: any;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    itemText: string;
};

export function CatalogForm({ item, onSubmit, onCancel, itemText }: Props) {
    return (
        <div className={style.backdrop}>
            <form onSubmit={onSubmit} className={style.card}>
                <SmallTitle text={item ? "Editar" + itemText : "Nuevo" + itemText} />

                <InputLabel
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    required
                    value={item?.name ?? ""}
                />

                <div className={style.actions}>
                    <DestructiveButton
                        text="Cancelar"
                        type="button"
                        onClick={onCancel}
                    />
                    <MainButton
                        enabled
                        text={item ? "Guardar cambios" : "Crear nuevo "}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}