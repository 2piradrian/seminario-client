export default function ChipWithCrossMock({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) {
  return (
    <div>
      <span>{text}</span>
      <button
        type="button"
        aria-label={`remove-${text}`}
        onClick={onClick}
      >
        X
      </button>
    </div>
  )
}
