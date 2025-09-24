import ChipWithCross from "../chip-with-cross/chip-with-cross";
import MainButton from "../main-button/main-button";
import SelectLabel from "../select-label/select-label";
import style from "./style.module.css"

type Props = {
    id: string;
    label: string;
    buttonText: string;
    options: string[];
    selected: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
}

export default function MultipleSelector({ options, selected, onAdd, onRemove, buttonText, label, id }: Props) {

    const handleAdd = () => {
        const select = document.getElementById(id) as HTMLSelectElement;
        const value = select.value;
        if (value !== "Seleccionar" && !selected.includes(value)) {
            onAdd(value);
        }
    }

    const handleRemove = (value: string) => {
        onRemove(value);
    }

    return (
        <div className={style.container}>
            <div className={style.containerInput}>
                <SelectLabel
                    id={id} 
                    label={label}
                    value={""}
                    values={["Seleccionar", ...options]}
                    />
                <MainButton enabled text={buttonText} type="button" onClick={()=>{handleAdd()}}/>
            </div>
            <div className={style.containerList}>
                {
                    selected.map((item) => (
                        <ChipWithCross key={item} text={item} onClick={()=>{handleRemove(item)}}/>
                    ))
                }
            </div>
        </div>
    );
}