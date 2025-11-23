import InputLabel from "../input-label/input-label";
import MainIconButton from "../main-icon-button/main-icon-button";
import style from "./style.module.css"
import searchIcon from "../../../assets/icons/search.svg"

type Props = {
    onSearch: (searchText: string) => void;
};

export default function SearchBox({onSearch}:Props){

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchText = formData.get("content") as string;
        onSearch(searchText);
    };

    return(
        <form className={style.container} onSubmit={handleSubmit}>
            <InputLabel 
                id="content" 
                label=""
                placeholder="Buscar..."
                type="text"
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