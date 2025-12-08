import style from "./style.module.css";
import searchIcon from "../../../assets/icons/search.svg";
import filterIcon from "../../../assets/icons/filter.svg";

type Props = {
    onSearch: (searchText: string) => void;
    defaultValue?: string;
    onToggleFilters?: () => void;
    filtersActive?: boolean;
};

export default function SearchBox({
    onSearch,
    defaultValue,
    onToggleFilters,
    filtersActive = false
}:Props){
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchText = formData.get("content") as string;
        onSearch(searchText);
    };

    return(
        <form className={style.container} onSubmit={handleSubmit}>
            <div className={style.inputWrapper}>
                <img src={searchIcon} alt="Buscar" className={style.leadingIcon}/>
                <input 
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Busca personas, posts, paginas, eventos..."
                    className={style.input}
                    aria-label="Buscar"
                    defaultValue={defaultValue}
                />
            </div>
            <button 
                type="submit" 
                className={style.searchButton}
                aria-label="Buscar"
            >
                Buscar
            </button>
            <button 
                type="button" 
                className={`${style.filterButton} ${filtersActive ? style.filterButtonActive : ""}`} 
                aria-label="Filtros"
                aria-pressed={filtersActive}
                onClick={onToggleFilters}
            >
                <img src={filterIcon} alt="" className={style.filterIcon}/>
            </button>
        </form>
    );
}
