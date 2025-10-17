import MediumTitle from "../../atoms/medium-title/medium-title";
import SearchBox from "../../atoms/search-box/search-box";
import SelectLabel from "../../atoms/select-label/select-label";
import style from "./style.module.css";

type Props = {
    types: string[];
    categories: string[];
}

export function SearchPage({categories, types}: Props) {
    return (
        <div className={style.container}>
            <div className={style.searchBox}>
                <SearchBox onSearch={(e) => {}} />
            </div>
            <div className={style.filters}>
                <MediumTitle text="Filtros" />
                <SelectLabel id="search" label="Tipos" value={""} values={["Seleccionar", ...types]} />
                <SelectLabel id="categories" label="Categorias" value="" values={["Seleccionar", ...categories]} />
            </div>
        </div>
    )
}