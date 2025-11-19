import type { Notification } from "../../../../domain/entity/notification";
import MediumTitle from "../../atoms/medium-title/medium-title";
import NotificationItem from "../../molecules/notification-item/notification-item";
import style from "./style.module.css";

type Props = {
    notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
    return (
        <section className={style.container}>
            <MediumTitle text="Notificaciones" />
            { notifications.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    {notifications.map((notification) => (
                        <div key={notification.id}>
                            <NotificationItem notification={notification} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
