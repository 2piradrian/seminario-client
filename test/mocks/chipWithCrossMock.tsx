type Props = {
    text: string
    onClick?: () => void
}

export default function ChipWithCrossMock({text, onClick}: Props){
    return (
        <div>
            <span>{text}</span>
            <button aria-label={`remove-${text}`} onClick={onClick}>
                X
            </button>
        </div>
    )
}