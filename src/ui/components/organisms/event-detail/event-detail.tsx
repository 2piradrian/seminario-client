import type { Event } from "../../../../domain";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import EventItem from "../../molecules/event-item/event-item";
import Modal from "../../molecules/modal/modal";
import style from "./style.module.css";

type Props = {
    event: Event;
    isMine: boolean;
    isAdminOrMod: boolean;
    isDeleteOpen: boolean;
    isCancelOpen: boolean;
    onClickDelete: () => void;
    onClickCancel: () => void;
    cancelDelete: () => void;
    cancelCancelEvent: () => void;
    proceedDelete: () => void;
    proceedCancel: () => void;
    onClickEdit?: () => void;
    onClickOnAvatar: () => void;
    onClickOnEvent: () => void;
    handleToggleAssist: () => void;
    isEnded: boolean;
}

export default function EventDetail({
    event,
    isMine,
    isAdminOrMod,
    onClickDelete,
    onClickCancel,
    onClickEdit,
    onClickOnAvatar,
    onClickOnEvent,
    cancelDelete,
    cancelCancelEvent,
    proceedDelete,
    proceedCancel,
    isDeleteOpen,
    isCancelOpen,
    handleToggleAssist,
    isEnded
}: Props) {
    return (
        <div className={style.container}>
            <EventItem
                event={event}
                isMine={isMine}
                isEnded={isEnded}
                isAdminOrMod={isAdminOrMod}
                onClickDelete={onClickDelete}
                onClickCancel={onClickCancel}
                onClickEdit={onClickEdit}
                onClickOnAvatar={onClickOnAvatar}
                onClickOnEvent={onClickOnEvent}
            />

            {isDeleteOpen && (
                <Modal
                    title="¿Estas seguro de eliminar este evento?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete}
                    onProceed={proceedDelete}
                />
            )}
            {isCancelOpen && (
                <Modal
                    title="¿Estas seguro de cancelar este evento?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Volver"
                    deleteText="Continuar"
                    onCancel={cancelCancelEvent}
                    onProceed={proceedCancel}
                />
            )}
            {!isMine && !isEnded && (
                event.isAssisting ? (
                    <SecondaryButton
                        enabled
                        text="Dejar de asistir"
                        type="button"
                        onClick={handleToggleAssist}
                    />
                ) : (
                    <MainButton
                        enabled
                        text="¡Yo voy!"
                        type="button"
                        onClick={handleToggleAssist}
                    />
                )
            )}
        </div>
    )
}
