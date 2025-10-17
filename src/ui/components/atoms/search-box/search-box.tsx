import InputLabel from "../input-label/input-label";
import MainIconButton from "../main-icon-button/main-icon-button";
import style from "./style.module.css"
import searchIcon from "../../../assets/icons/search.svg"

type Props = {
    onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBox({onSearch}:Props){
    return(
        <form className={style.container} onSubmit={onSearch}>
            <InputLabel 
                id="content" 
                label=""
                placeholder="Buscar..."
                type="text"
                required
            />
            <div className={style.buttonContainer}>
                <MainIconButton
                    text=""
                    type="submit"
                    enabled={true}
                    onClick={() => {}}
                    icon={searchIcon}
                    modifier={style.searchButton}
                />
            </div>

        </form>

    )
}