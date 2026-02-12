import type { Event, Profile, User } from "../../../../domain";
import MainButton from "../../atoms/main-button/main-button";
import SecondaryButton from "../../atoms/secondary-button/secondary-button";
import EventItem from "../../molecules/event-item/event-item";
import FloatingCard from "../../molecules/floating-card/floating-card";
import Modal from "../../molecules/modal/modal";
import StateFullSelector from "../../atoms/state-full-selector/state-full-selector";
import ProfileSimpleList from "../profile-simple-list/profile-simple-list";
import style from "./style.module.css";

type Props = {
    event: Event;
    isMine: boolean;
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
    isAdminOrMod?: boolean;
    isEnded: boolean;
    isMenuOpen?: boolean;
    activeMenuId?: string | null;
    onToggleMenu?: (eventId: string) => void;
    onCloseMenu?: () => void;
    assistants: Profile[];
    showAssistants: boolean;
    onOpenAssistants: () => void;
    onCloseAssistants: () => void;
    onClickOnProfile: (profileId: string) => void;
    pageNumberPagination: number;
    onPrev: () => void;
    onNext: () => void;
    hasNextAssistantsPage: boolean;
    assistantsPage: number;
    showDeleteReasonSelector?: boolean;
    moderationReasonOptions?: string[];
    selectedDeleteReason?: string;
    onDeleteReasonChange?: (value: string) => void;
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
    isEnded,
    activeMenuId,
    onCloseMenu,
    onToggleMenu,
    assistants,
    showAssistants,
    onCloseAssistants,
    onOpenAssistants,
    onClickOnProfile,
    pageNumberPagination,
    onNext,
    onPrev,
    hasNextAssistantsPage,
    assistantsPage,
    showDeleteReasonSelector,
    moderationReasonOptions,
    selectedDeleteReason,
    onDeleteReasonChange
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
                isMenuOpen={activeMenuId === event.id}
                onToggleMenu={onToggleMenu ? () => onToggleMenu(event.id) : undefined}
                onCloseMenu={onCloseMenu}
                onClickAssistants={onOpenAssistants}
            />

            {showAssistants && (
                <FloatingCard
                    title="¿Quiénes asisten al evento?"
                    onClose={onCloseAssistants}
                    pageNumber={pageNumberPagination}
                    onNext={onNext}
                    onPrev={onPrev}
                    disabledNext={!hasNextAssistantsPage}
                    disabledPrev={assistantsPage === 1}
                >
                    <ProfileSimpleList onClickOnProfile={onClickOnProfile} profiles={assistants} />
                </FloatingCard>
                )
            }

            {isDeleteOpen && (
                <Modal
                    title="¿Estas seguro de eliminar este evento?"
                    description="Esta acción no se puede deshacer"
                    cancelText="Cancelar"
                    deleteText="Eliminar"
                    onCancel={cancelDelete}
                    onProceed={proceedDelete}
                >
                    {showDeleteReasonSelector && (
                        <StateFullSelector
                            id="deleteEventReason"
                            label="Motivo"
                            value={selectedDeleteReason || "Seleccionar"}
                            values={["Seleccionar", ...(moderationReasonOptions ?? [])]}
                            onChange={onDeleteReasonChange ?? (() => {})}
                        />
                    )}
                </Modal>
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
