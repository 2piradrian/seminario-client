import { type ChangeEvent } from "react";
import style from "./style.module.css";

type Props = {
    id: string;
    label: string;
    value: string | undefined;
    values: string[];
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function StateFullSelector({label, id, value, values, onChange, disabled}: Props){
const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        
        if (onChange) {
            onChange(newValue);
        }
    }

    return(
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
		    <select 
                name={id} 
                id={id} 
                value={value} 
                onChange={handleChange}
                disabled={disabled}
            >
                {
                    values?.map((value: string) => (
                        <option key={value}>{value}</option>
                    ))
                }
            </select>
        </div>
    )
}