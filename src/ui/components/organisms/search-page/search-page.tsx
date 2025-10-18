import MediumTitle from "../../atoms/medium-title/medium-title";
import SearchBox from "../../atoms/search-box/search-box";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import style from "./style.module.css";

type Props = {
    contentTypes: string[];
    styles: string[];
    instruments: string[];
    pageTypes: string[];
    selectedType: string | null;
    selectedStyle: string | null;
    selectedInstrument: string | null;
    selectedPageType: string | null;
    onTypeChange: (value: string) => void;
    onStyleChange: (value: string) => void;
    onInstrumentChange: (value: string) => void;
    onPageTypeChange: (value: string) => void;
    showExtraFilters: boolean;
    searchText: string;
    onSearchChange: (value: string) => void;
}

export function SearchPage({
    contentTypes, 
    styles, 
    instruments,
    pageTypes,
    selectedType,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    onTypeChange,
    onStyleChange,
    onInstrumentChange,
    onPageTypeChange,   
    searchText,
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
                    value={selectedType || "Seleccionar"} 
                    values={["Seleccionar", ...contentTypes]} 
                    onChange={onTypeChange}
                />
                { selectedType === "Usuarios" && (
                    <>
                        <StateFullSelector 
                            id="Estilos" 
                            label="Estilos" 
                            value={selectedStyle|| "Seleccionar"}
                            values={["Seleccionar", ...styles]}
                            onChange={onStyleChange}
                        />
                        <StateFullSelector 
                            id="Intrumentos" 
                            label="Instrumentos" 
                            value={selectedInstrument|| "Seleccionar"}
                            values={["Seleccionar", ...instruments]} 
                            onChange={onInstrumentChange}
                        />
                    </>
                )}
                { selectedType === "Páginas" && (
                    <StateFullSelector 
                        id="TiposPaginas"
                        label="Tipo de página"
                        value={selectedPageType || "Seleccionar"}
                        values={["Seleccionar", ...pageTypes]}
                        onChange={onPageTypeChange} 
                    />
                )}
            </div>
        </div>
    )
}