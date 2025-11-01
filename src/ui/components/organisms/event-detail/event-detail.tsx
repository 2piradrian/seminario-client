import type { Event } from "../../../../domain";
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
    isDeleteOpen
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
        </div>
    )
}