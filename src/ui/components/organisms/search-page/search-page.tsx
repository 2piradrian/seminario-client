import { Tabs } from "../../../../core";
import { ContentType, Instrument, PageType, PostType, Style } from "../../../../domain";
import InputLabel from "../../atoms/input-label/input-label";
import MediumTitle from "../../atoms/medium-title/medium-title";
import SearchBox from "../../atoms/search-box/search-box";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import TabNavigator from "../../atoms/tab-navigator/tab-navigator";
import style from "./style.module.css";

type Props = {
    pageTypes: PageType[];
    styles: Style[];
    instruments: Instrument[];
    postTypes: PostType[];
    activeTab: string | null;
    selectedStyle: string | null;
    selectedInstrument: string | null;
    selectedPageType: string | null;
    selectedPostType: string | null;
    onStyleChange: (value: string) => void;
    onInstrumentChange: (value: string) => void;
    onPageTypeChange: (value: string) => void;
    onPostTypeChange: (value: string) => void;
    searchText: string;
    onSearchChange: (value: string) => void;
    dateInit: string;
    dateEnd: string;
    onDateInitChange: (value: string) => void;
    onDateEndChange: (value: string) => void;
    onTabClick: (tab: string) => void;
}

export function SearchPage({
    pageTypes,
    postTypes,
    styles, 
    instruments,
    activeTab,
    selectedStyle,
    selectedInstrument,
    selectedPageType,
    selectedPostType,
    onStyleChange,
    onInstrumentChange,
    onPageTypeChange,   
    onSearchChange,
    onPostTypeChange,
    dateInit,
    dateEnd,
    onDateInitChange,
    onDateEndChange,
    onTabClick
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
                { activeTab === ContentType.POSTS && (
                    <StateFullSelector 
                        id="TiposPosts"
                        label="Tipo de posts"
                        value={selectedPostType || "Seleccionar"}
                        values={["Seleccionar", ...PostType.mapToNames(postTypes)]}
                        onChange={onPostTypeChange} 
                    />
                )}
                { activeTab === ContentType.USERS && (
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
                { activeTab === ContentType.PAGES && (
                    <StateFullSelector 
                        id="TiposPaginas"
                        label="Tipo de página"
                        value={selectedPageType || "Seleccionar"}
                        values={["Seleccionar", ...PageType.mapToNames(pageTypes)]}
                        onChange={onPageTypeChange} 
                    />
                )}
                { activeTab === ContentType.EVENTS && (
                    <div className={style.dateContainer} >
                        <InputLabel 
                            id="dateInit"
                            placeholder="Fecha de Inicio"
                            type="date"
                            label="Desde"
                            value={dateInit}
                            onChange={onDateInitChange}
                        />
                        <InputLabel 
                            id="dateEnd"
                            placeholder="Fecha de Fin"
                            type="date"
                            label="Hasta"
                            value={dateEnd}
                            onChange={onDateEndChange}
                        />
                    </div>

                )}
            </div>
                <TabNavigator
                    tabs={Tabs.results}
                    activeTab={activeTab}
                    onTabClick={onTabClick}
                />
        </div>
    )
};