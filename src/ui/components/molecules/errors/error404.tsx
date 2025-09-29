import LargeTitle from "../../atoms/large-title/large-title"
import MediumTitle from "../../atoms/medium-title/medium-title"
import MainButton from "../../atoms/main-button/main-button"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
    heroSrc: string
    onGoHome: () => void
    onGoBack: () => void
}

export default function Error404({heroSrc, onGoHome, onGoBack }: Props ) {
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.code}>404</div>

                <img
                    className={style.hero}
                    src={heroSrc}
                    alt="Página no encontrada"
                    loading="lazy"
                />

                <LargeTitle text="No pudimos encontrar la página que buscabas"/>
                <MediumTitle text="Intentalo nuevamente"/>

                <div className={style.actions}>
                    <MainButton enabled text="Ir al inicio" type="button" onClick={onGoHome}/>
                    <SecondaryButton enabled text="Volver atras" type="button" onClick={onGoBack}/>
                </div>
            </div>
        </div>
    )
}