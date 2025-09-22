type props = {
    text: string
    type: "button" | "submit"
    enabled?: boolean
    onClick?: () => void
}

export default function MainButton({ text, type, enabled = true, onClick }: props) {
    return (
        <button type={type} disabled={!enabled} onClick={onClick}>{text}
        </button>
    )
}