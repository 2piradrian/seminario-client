import { useState } from "react";
import style from "./style.module.css"

type Props = {
    id: string;
    type: "text" | "number" | "password" | "date";
    placeholder: string;
    required: boolean;
    label?: string;
    value?: string | undefined;
}

export default function InputLabel({label, type, placeholder, id, required, value}: Props) {
    const [self, setSelf] = useState<string | undefined>(value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelf(e.target.value);
    }

    return(
        <div className={style.container}>
            {label && <label htmlFor={id}>{label}</label>}
		    <input 
                type={type} 
                placeholder={placeholder} 
                name={id} 
                id={id} 
                value={self} 
                onChange={handleChange} 
                required={required} 
                onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()} 
            />
        </div>
    )

}