import type { Event } from "../../../../domain";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import EventItem from "../../molecules/event-item/event-item";
import Modal from "../../molecules/modal/modal";
import style from "./style.module.css";

type Props = {
    event: Event;
    isMine: boolean;
    isDeleteOpen: boolean;
    onClickDelete: () => void;
    cancelDelete: () => void;
    proceedDelete: () => void;
    onClickEdit?: () => void;
    onClickOnAvatar: () => void;
    onClickOnEvent: () => void;
    handleToggleAssist: () => void;

}

export default function EventDetail({
    event, 
    isMine, 
    onClickDelete,
    onClickEdit,
    onClickOnAvatar,
    onClickOnEvent,
    cancelDelete, 
    proceedDelete,
    isDeleteOpen,
    handleToggleAssist
}: Props) {
    return(
        <div className={style.container}> 
            <EventItem 
                event={event}
                isMine={isMine}
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
                onClickOnAvatar={onClickOnAvatar}
                onClickOnEvent={onClickOnEvent}
            />  

            {isDeleteOpen && (
                <Modal 
                    title="¿Estas seguro de eliminar este post?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete}
                    onProceed={proceedDelete}
                />
            )}
            {!isMine && (
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