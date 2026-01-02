import DestructiveButton from "../../atoms/destructive-button/destructive-button"
import LargeTitle from "../../atoms/large-title/large-title"
import MainButton from "../../atoms/main-button/main-button"
import MediumTitle from "../../atoms/medium-title/medium-title"
import SecondaryButton from "../../atoms/secondary-button/secondary-button"
import style from "./style.module.css"

type Props = {
    title: string
    cancelText: string
    deleteText: string
    onCancel: () => void
    onProceed: () => void
    description?: string
    continueModal?: boolean
}

export default function Modal({
    title,
    description,
    cancelText,
    deleteText,
    onCancel,
    onProceed,
    continueModal = false
}: Props) {
    return (
    <div className={style.backdrop} role="dialog" aria-modal="true">
      <div className={style.panel}>
        <div className={style.content}>
          <LargeTitle text={title} />
          {description && (
            <div className={style.descriptionBlock}>
              <MediumTitle text={description} />
            </div>
          )}

        </div>

        <div className={style.divider} />

        <div className={style.actions}>
          <SecondaryButton
            text={cancelText}
            type="button"
            enabled={true}
            onClick={onCancel}
          />
            { continueModal ? (

                <MainButton
                    enabled
                    text={deleteText}
                    type="button"
                    onClick={onProceed}
                />
                ) : (
                <DestructiveButton
                    text={deleteText}
                    type="button"
                    onClick={onProceed}
                />
                ) 
            }
        </div>
      </div>
    </div>
  );
}
