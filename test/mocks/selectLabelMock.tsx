type Props = {
    id: string
    label: string
    value?: string
    values: string[]
}

export default function SelectLabel({ id, label, value = "", values }: Props) {
    return (
        <label htmlFor={id}>
            {label}
            <select name={id} id={id} defaultValue={value} data-testid="ms-select">
                {values.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}    
            </select>
        </label>
    )
}