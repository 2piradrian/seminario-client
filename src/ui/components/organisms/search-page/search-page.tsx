import { ContentType, Instrument, PageType, Style } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import SearchBox from "../../atoms/search-box/search-box";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import style from "./style.module.css";

type Props = {
    contentTypes: ContentType[];
    pageTypes: PageType[];
    styles: Style[];
    instruments: Instrument[];
    selectedContentType: string | null;
    selectedStyle: string | null;
    selectedInstrument: string | null;
    selectedPageType: string | null;
    onTypeChange: (value: string) => void;
    onStyleChange: (value: string) => void;
    onInstrumentChange: (value: string) => void;
    onPageTypeChange: (value: string) => void;
    searchText: string;
    onSearchChange: (value: string) => void;
}

export function SearchPage({
    contentTypes, 
    pageTypes,
    styles, 
    instruments,
    selectedContentType,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    onTypeChange,
    onStyleChange,
    onInstrumentChange,
    onPageTypeChange,   
    onSearchChange
}: Props) {
    return (
        <div className={style.container}>
            <div className={style.searchBox}>
                <SearchBox 
                    onSearch={onSearchChange}  
                />
            </div>
            <div className={style.filters}>
                <MediumTitle text="Filtros" />
                <StateFullSelector 
                    id="search" 
                    label="Tipo" 
                    value={selectedContentType || "Seleccionar"} 
                    values={["Seleccionar", ...ContentType.mapToNames(contentTypes)]} 
                    onChange={onTypeChange}
                />
                { selectedContentType === "Usuarios" && (
                    <>
                        <StateFullSelector 
                            id="Estilos" 
                            label="Estilos" 
                            value={selectedStyle|| "Seleccionar"}
                            values={["Seleccionar", ...Style.mapToNames(styles)]}
                            onChange={onStyleChange}
                        />
                        <StateFullSelector 
                            id="Intrumentos" 
                            label="Instrumentos" 
                            value={selectedInstrument|| "Seleccionar"}
                            values={["Seleccionar", ...Instrument.mapToNames(instruments)]} 
                            onChange={onInstrumentChange}
                        />
                    </>
                )}
                { selectedContentType === "Páginas" && (
                    <StateFullSelector 
                        id="TiposPaginas"
                        label="Tipo de página"
                        value={selectedPageType || "Seleccionar"}
                        values={["Seleccionar", ...PageType.mapToNames(pageTypes)]}
                        onChange={onPageTypeChange} 
                    />
                )}
            </div>
        </div>
    )
};