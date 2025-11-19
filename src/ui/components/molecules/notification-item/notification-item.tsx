import type { Notification } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    notification: Notification;
}

export default function NotificationItem({ notification }: Props) {
    return(
        <div className={`${style.container} ${style[notification.content.toString()]}`}>
            <span className={style.notificationContent}>
                {notification.buildMessage()}
            </span>
        </div>
    )
}