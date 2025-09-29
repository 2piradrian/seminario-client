import LargeTitle from "../../atoms/large-title/large-title"
import MediumTitle from "../../atoms/medium-title/medium-title"
import MainButton from "../../atoms/main-button/main-button"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
  onRetry: () => void
  onGoHome: () => void
}

export default function Error500({ onRetry, onGoHome }: Props) {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <LargeTitle text="500 — Error interno" />
        <MediumTitle text="Ocurrió un problema en el servidor." />
        <p className={style.text}>Intentalo nuevamente.</p>

        <div className={style.actions}>
          <MainButton enabled text="Reintentar" type="button" onClick={onRetry} />
          <SecondaryButton enabled text="Ir al inicio" type="button" onClick={onGoHome} />
        </div>
      </div>
    </div>
  )
}
