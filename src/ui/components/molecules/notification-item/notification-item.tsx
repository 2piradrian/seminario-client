import type { Notification } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";

type Props = {
    notification: Notification;
    redirectToNotification: (notification: Notification) => void;
}

export default function NotificationItem({ notification, redirectToNotification }: Props) {
    return(
        <div className={`${style.container} ${style[notification.content.toString()]}`} onClick={() => redirectToNotification(notification)}>
            <div className={style.notification}>
                <Avatar profile={notification.carriedOutBy.toProfile()} hideName />
                <div className={style.notificationInfo}>
                    <span className={style.username}>
                        {notification.carriedOutBy.toProfile().displayName}
                    </span>
                    <span className={style.notificationContent}>
                        {notification.buildMessage()}
                    </span>
                </div>
            </div>
        </div>
    )
}