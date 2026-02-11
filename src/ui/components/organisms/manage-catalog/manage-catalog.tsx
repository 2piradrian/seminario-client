import CatalogItem from "../../atoms/catalog-item/catalog-item";
import LargeTitle from "../../atoms/large-title/large-title";
import SmallTitle from "../../atoms/small-title/small-title";
import style from "./style.module.css";

type Props = {
    onClickOnPostType: () => void;
    onClickOnPageType: () => void;
    onClickOnInstruments: () => void;
    onClickOnStyles: () => void;
    onClickOnModerationReasons: () => void;
}

export default function ManageCatalog( { 
    onClickOnPostType, onClickOnPageType, onClickOnInstruments, onClickOnStyles, onClickOnModerationReasons 
}: Props) {

    return (
        <div className={style.container}>
            <div className={style.titles}>
                <LargeTitle text="Gestión de catálogo"/>
                <SmallTitle text="Seleccione el módulo a administrar" />
            </div>
           
            <div className={style.catalogItems}>
                <CatalogItem title="Tipos de publicación" onClick={onClickOnPostType} />
                <CatalogItem title="Tipos de página" onClick={onClickOnPageType} />
                <CatalogItem title="Instrumentos" onClick={onClickOnInstruments} />
                <CatalogItem title="Estilos" onClick={onClickOnStyles} />
                <CatalogItem title="Razones de moderación" onClick={onClickOnModerationReasons} />
            </div>
        </div>
    )
}