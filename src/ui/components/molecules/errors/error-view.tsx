import LargeTitle from "../../atoms/large-title/large-title"
import MediumTitle from "../../atoms/medium-title/medium-title"
import MainButton from "../../atoms/main-button/main-button"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
  title: string
  subtitle?: string
  code?: string
  heroSrc?: string
  heroAlt?: string

  primaryText: string
  onPrimary: () => void

  secondaryText?: string
  onSecondary?: () => void
}

export default function ErrorView({
  title, subtitle, code, heroSrc, heroAlt = "",
  primaryText, onPrimary,secondaryText,
  onSecondary,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.card}>
        {code && <div className={style.code}>{code}</div>}

        {heroSrc && (
          <img className={style.hero} src={heroSrc} alt={heroAlt} loading="lazy" />
        )}

        <LargeTitle text={title} />
        {subtitle && <MediumTitle text={subtitle} />}

        <div className={style.actions}>
          <MainButton enabled text={primaryText} type="button" onClick={onPrimary} />
          {secondaryText && onSecondary && (
            <SecondaryButton
              enabled
              text={secondaryText}
              type="button"
              onClick={onSecondary}
            />
          )}
        </div>
      </div>
    </div>
  )
}
