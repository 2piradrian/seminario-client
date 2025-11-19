import { useState } from "react";
import type { Ref } from "react";
import style from "./style.module.css"

type Props = {
    id: string;
    type: "text" | "number" | "password" | "date";
    placeholder: string;
    required: boolean;
    label?: string;
    value?: string | undefined;
    inputRef?: Ref<HTMLInputElement>;
}

export default function InputLabel({label, type, placeholder, id, required, value, inputRef}: Props) {
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
                ref={inputRef}
                value={self} 
                onChange={handleChange} 
                required={required} 
                onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()} 
            />
        </div>
    )

}
