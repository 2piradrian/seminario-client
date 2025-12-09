import type { Notification } from "../../../../domain/entity/notification";
import MediumTitle from "../../atoms/medium-title/medium-title";
import NotificationItem from "../../molecules/notification-item/notification-item";
import style from "./style.module.css";

type Props = {
    notifications: Notification[];
    redirectToNotification: (notification: Notification) => void;
}

export default function NotificationList({ notifications, redirectToNotification}: Props) {
    return (
        <section className={style.container}>
            { notifications.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
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
        </section>
    )
}
