import type { Notification } from "../../../../domain/entity/notification";
import NotificationItem from "../../molecules/notification-item/notification-item";
import style from "./style.module.css";

type Props = {
    notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
    return (
        <section className={style.list}>
            {notifications.map((notification) => (
                <div key={notification.id}>
                    <NotificationItem content={notification.content} />
                </div>
            ))}
        </section>
    )
}
