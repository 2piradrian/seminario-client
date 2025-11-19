import type { Notification } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    notification: Notification;
    redirectToNotification: (notification: Notification) => void;

}

export default function NotificationItem({ notification, redirectToNotification }: Props) {
    return(
        <div className={`${style.container} ${style[notification.content.toString()]}`} onClick={() => redirectToNotification(notification)}>
            <span className={style.notificationContent}>
                {notification.buildMessage()}
            </span>
        </div>
    )
}