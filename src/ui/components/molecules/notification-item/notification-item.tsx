import style from "./style.module.css";

type Props = {
    content,
    notification
}

export default function NotificationItem({ content }: Props) {
    return(
        <div className={style.container}>
            <span className={style.notificationContent}>
                {content}
            </span>
        </div>
    )
}