type Props = {
  text: string
  type: "submit" | "button"
  enabled: boolean
  onClick: () => void
  modifier?: string
}

export default function MainButtonMock({ text, type, enabled = true, onClick }: Props) {
  return (
    <button type={type} disabled={!enabled} onClick={onClick}>
      {text}
    </button>
  )
}
