import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { useRepositories } from "../../../core";
import { Notification } from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id, type } = useParams(); 
    const { userId, session } = useSession();

    const { notificationRepository } = useRepositories();
    const { trigger } = useScrollLoading();

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    const [notificationsPage, setNotificationsPage] = useState<number | null>(1);

    
    /* useEffect */ 

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (session != null){
                await fetchNotifications();
                setNotificationsPage(trigger);
            }
        }
        fetchData().then(() => setLoading(false));
    }, [id, type, session]);
    
    
    /* fetch */ 
    
    const fetchNotifications = async () => {
        if (!session || !userId || notificationsPage == null) return;
        const response = await notificationRepository.getNotificationsByTarget({
            page: notificationsPage,
            size: 10,
            session: session,
            targetId: userId
        })
        
        if (!response.nextPage) setNotificationsPage(null);

        if (notificationsPage === 1) {
            setNotifications(response.notifications.map(n => Notification.fromObject(n)))
        }
        else {
            setNotifications(prevNotifications => [
                ...prevNotifications,
                ...response.notifications.map(n => Notification.fromObject(n))
            ])
        }

    }

    /* actions */

    const redirectToNotification = (notification: Notification) => {
        if (!notification?.sourceId) return;

        switch (notification.content) {
            case "POST":
            case "UPVOTE":
            case "DOWNVOTE":
            case "COMMENT":
                navigate(`/post-detail/${notification.sourceId}`);
                break;
            case "FOLLOW":
                navigate(`/user/${notification.sourceId}`);
                break;
            case "ASSIST":
                navigate(`/event-detail/${notification.sourceId}`);
                break;
            default:
                navigate(`/source/${notification.sourceId}`);
                break;
        }
    };


    return {
        loading,
        notifications,
        redirectToNotification   
    }
}