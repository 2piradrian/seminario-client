import { PageType, Style, Instrument } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import SearchBox from "../../atoms/search-box/search-box";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import TabNavigator from "../../atoms/tab-navigator/tab-navigator";
import style from "./style.module.css";

type Props = {
    pageTypes: PageType[];
    styles: Style[];
    instruments: Instrument[];
    selectedStyle: string | null;
    selectedInstrument: string | null;
    selectedPageType: string | null;
    onStyleChange: (value: string) => void;
    onInstrumentChange: (value: string) => void;
    onPageTypeChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    tabs: string[];
    activeTab: string;
    onTabClick: (tab: string) => void;
}

export function SearchPage({
    pageTypes,
    styles, 
    instruments,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    onStyleChange,
    onInstrumentChange,
    onPageTypeChange,   
    onSearchChange,
    tabs,
    activeTab,
    onTabClick
}: Props) {
    return (
        <div className={style.container}>
            <div className={style.searchBox}>
                <SearchBox 
                    onSearch={onSearchChange}  
                />
            </div>
            <TabNavigator 
                tabs={tabs}
                activeTab={activeTab}
                onTabClick={onTabClick}
            />

            <div className={style.filters}>
                { activeTab === "Usuarios" && (
                    <>
                        <StateFullSelector 
                            id="Estilos" 
                            label="Estilos" 
                            value={selectedStyle || "Seleccionar"}
                            values={["Seleccionar", ...Style.mapToNames(styles)]}
                            onChange={onStyleChange}
                        />
                        <StateFullSelector 
                            id="Intrumentos" 
                            label="Instrumentos" 
                            value={selectedInstrument || "Seleccionar"}
                            values={["Seleccionar", ...Instrument.mapToNames(instruments)]} 
                            onChange={onInstrumentChange}
                        />
                    </>
                )}
                { activeTab === "Páginas" && (
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
}