import style from "./style.module.css";
import searchIcon from "../../../assets/icons/search.svg";
import filterIcon from "../../../assets/icons/filter.svg";
import InputLabel from "../input-label/input-label";
import MainIconButton from "../main-icon-button/main-icon-button";
import SecondaryIconButton from "../secondary-icon-button/secondary-icon-button";

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
                <InputLabel 
                    id="content"
                    label={""}
                    placeholder={"Buscar..."}
                    type={"text"}
                    value={defaultValue}
                />
            </div>
            <div className={style.buttonContainer}>
                <MainIconButton
                    text={""}
                    type="submit"
                    enabled={true}
                    onClick={() => {}}
                    icon={searchIcon}
                    modifier={style.searchButton}
                />
            </div>

            <SecondaryIconButton
                text={""}
                type={"button"}
                enabled={true}
                onClick={onToggleFilters}
                icon={filterIcon}
                modifier={`${style.filterButton} ${filtersActive ? style.filterButtonActive : ""}`}
            />
        </form>
    );
}
