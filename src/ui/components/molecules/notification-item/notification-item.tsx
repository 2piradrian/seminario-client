import type { Notification } from "../../../../domain";
import { IconMapper } from "../../../../core/utils/get-icon";
import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";
import TimeAgo from "../../atoms/time-ago/time-ago";

type Props = {
    notification: Notification;
    redirectToNotification: (notification: Notification) => void;
}

export default function NotificationItem({ notification, redirectToNotification }: Props) {
    return(
        <div className={`${style.container} ${style[notification.content.toString()]}`} onClick={() => redirectToNotification(notification)}>
            <div className={style.notification}>
                <div className={`${style.iconContainer} ${style[notification.content.toString()]}`}>
                    <img 
                        src={IconMapper.getNotificationIcon(notification.content.toString())} 
                        alt="Notification Icon" 
                        className={style.icon} 
                    />
                </div>
                <div className={style.contentBody}>
                    <Avatar profile={notification.carriedOutBy.toProfile()} hideName />
                    <div className={style.notificationInfo}>
                        <span className={style.username}>
                            {notification.carriedOutBy.toProfile().displayName}
                        </span>
                        <span className={style.notificationContent}>
                            {notification.buildMessage()}
                        </span>
                    </div>
                <div className={style.timeWrapper}>
                        <TimeAgo createdAt={notification.createdAt}/>
                    </div>
                </div>
            </div>
        </div>
    )
}