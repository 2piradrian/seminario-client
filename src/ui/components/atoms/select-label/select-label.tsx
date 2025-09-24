import { useState } from "react";
import style from "./style.module.css";

type Props = {
    id: string;
    label: string;
    value: string | undefined;
    values: string[];
}

export default function SelectLabel({label, id, value, values}: Props){
    const [self, setSelf] = useState<string | undefined>(value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelf(e.target.value);
    }

    return(
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
		    <select name={id} id={id} value={self} onChange={handleChange}>
                {
                    values?.map((value: string) => (
                        <option key={value}>{value}</option>
                    ))
                }
            </select>
        </div>
    )
}