import type { Notification } from "../../../../domain/entity/notification";
import MediumTitle from "../../atoms/medium-title/medium-title";
import Modal from "../../molecules/modal/modal";
import NotificationItem from "../../molecules/notification-item/notification-item";
import style from "./style.module.css";

type Props = {
    notifications: Notification[];
    redirectToNotification: (notification: Notification) => void;
    isJoinOpen: boolean,
    cancelJoin: () => void,
    proceedJoin: () => void
}

export default function NotificationList({ 
    notifications, 
    redirectToNotification,
    isJoinOpen,
    cancelJoin,
    proceedJoin
}: Props) {
    return (
        <section className={style.container}>
            { notifications.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    <MediumTitle text="Notificaciones" />
                    {notifications.map((notification) => (
                        <div className={style.itemContainer} key={notification.id}>
                            <NotificationItem 
                                notification={notification} 
                                redirectToNotification={redirectToNotification}
                            />
                        </div>
                    ))}
                </div>
            )}
            {isJoinOpen && (
                <Modal
                    title="Quieres ser parte de esta pagina?"
                    description="Luego podras salirte de ella si asi lo deseas"
                    cancelText="Ver luego"
                    deleteText="Unirme"
                    onCancel={cancelJoin}
                    onProceed={proceedJoin}
                    continueModal={true}
                />
            )}
        </section>
    )
}
