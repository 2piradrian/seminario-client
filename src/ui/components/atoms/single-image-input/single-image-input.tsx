import { useState, useEffect } from "react";
import MainButton from "../main-button/main-button";
import style from "./style.module.css";

type Props = {
    id: string;
    label?: string;
    value?: File | null;
    required: boolean;
    accept?: string;
    buttonText?: string;
    onChange?: (file: File | null) => void;
}

export default function SingleImageInput({id, label, value = null, required, buttonText, onChange}: Props) {

    const [file, setFile] = useState<File | null>(value);

    useEffect(() => {
        setFile(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        onChange?.(selectedFile);
    };

    const handleClick = () => {
        const input = document.getElementById(id) as HTMLInputElement | null;
        input?.click();
    };

    return (
        <div className={style.container}>
            <label htmlFor={id}>{label}</label>
            <input 
                className={style.hiddenInput}
                id={id}
                type="file"
                required={required}
                accept={"image/jpg, image/jpeg"}
                onChange={handleChange}
            />
            <MainButton
                text={buttonText || "Seleccionar archivo"}
                type="button"
                enabled={true}
                onClick={handleClick}
            />
            <div className={style.fileName}>
                <strong>Imágen seleccionada:</strong>{" "}
                {file ? file.name : "Mantener imágen actual"}
            </div>
        </div>
    );
}