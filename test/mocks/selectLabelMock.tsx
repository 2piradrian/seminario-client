import React from "react"

type Props = {
  id: string
  label: string
  value: string | undefined
  values: string[]
}

export default function SelectLabelMock({ id, label, value, values }: Props) {
  const [self, setSelf] = React.useState<string>(value || "")
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        value={self}
        onChange={(e) => setSelf(e.target.value)}
        data-testid={`${id}-select`}
      >
        {values.map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  )
}
