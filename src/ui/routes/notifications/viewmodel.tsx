import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { useRepositories } from "../../../core";
import { Notification, NotificationContent, User, ModerationReason, type GetModerationReasonByIdReq, type GetUserByIdReq, type JoinPageReq, Errors } from "../../../domain";
import toast from "react-hot-toast";
import type { MarkAsReadReq } from "../../../domain/dto/notification/request/MarkAsReadReq";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id, type } = useParams(); 
    const { userId, session } = useSession();

    const { notificationRepository, userRepository, sessionRepository, pageRepository, catalogRepository, moderationReasonRepository } = useRepositories();
    const { trigger } = useScrollLoading();

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [moderationReasons, setModerationReasons] = useState<ModerationReason[]>([]);
    const [user, setUser] = useState<User | null>(null);
    
    const [notificationsPage, setNotificationsPage] = useState<number | null>(1);

    const [isJoinOpen, setIsJoinOpen] = useState(false);
    const [pageId, setPageId] = useState<string | null>(null);

    
    /* useEffect */ 

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (session != null){
                await fetchUser();
                await fetchNotifications();
                setNotificationsPage(trigger);
            }
        }
        fetchData().then(() => setLoading(false));
    }, [id, type, session]);
    
    
    /* fetch */ 
    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : "Error al cargar perfil");
        }
    };

    const fetchNotifications = async () => {
        if (!session || !userId || notificationsPage == null) return;
        const response = await notificationRepository.getNotificationsByTarget({
            page: notificationsPage,
            size: 10,
            session: session,
            targetId: userId
        })
        
        if (!response.nextPage) setNotificationsPage(null);

        const parsedNotifications = await enrichModerationReasonNames(
            response.notifications.map(n => Notification.fromObject(n))
        );

        if (notificationsPage === 1) {
            setNotifications(parsedNotifications)
        } else {
            setNotifications(prevNotifications => [
                ...prevNotifications,
                ...parsedNotifications
            ])
        }

    }

    const fetchModerationReasons = async () => {
        try {
            const response = await catalogRepository.getAllModerationReason();
            setModerationReasons(response.moderationReasons.map(r => ModerationReason.fromObject(r)));
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const enrichModerationReasonNames = async (input: Notification[]): Promise<Notification[]> => {
        if (!session) return input;

        const localReasonById: Record<string, string> = {};
        moderationReasons.forEach((r) => {
            localReasonById[String(r.id).trim().toLowerCase()] = String(r.name);
        });

        const missingIds = Array.from(new Set(
            input
                .filter(n => n?.content === NotificationContent.MODERATION)
                .filter(n => n?.reason?.id && !n?.reason?.name)
                .map(n => String(n.reason.id))
                .filter(reasonId => !localReasonById[reasonId.trim().toLowerCase()])
        ));

        if (missingIds.length > 0) {
            await Promise.all(missingIds.map(async (reasonId) => {
                try {
                    const response = await moderationReasonRepository.getById({
                        session,
                        id: reasonId
                    } as GetModerationReasonByIdReq);

                    const reasonName = response?.moderationReason?.name;
                    if (reasonName) {
                        localReasonById[reasonId.trim().toLowerCase()] = String(reasonName);
                    }
                } catch {
                }
            }));
        }

        return input.map((notification) => {
            if (notification?.content !== NotificationContent.MODERATION) return notification;
            if (!notification.reason?.id || notification.reason?.name) return notification;

            const resolvedName = localReasonById[String(notification.reason.id).trim().toLowerCase()];
            if (!resolvedName) return notification;

            return new Notification(
                notification.id,
                notification.targetId,
                notification.sourceId,
                new ModerationReason(String(notification.reason.id), resolvedName),
                notification.content,
                notification.carriedOutBy,
                notification.createdAt,
                notification.updatedAt,
                notification.isRead
            );
        });
    };

    useEffect(() => {
        if (!session) return;
        fetchModerationReasons().then();
    }, [session]);

    /* actions */

    const redirectToNotification = (notification: Notification) => {
        if (!notification?.sourceId) return;

        if (!notification.isRead && session && notification.content !== "PAGE_INVITATION") {
            notificationRepository.markAsRead({
                session: session,
                notificationId: notification.id
            } as MarkAsReadReq);
        }
            
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
            case "PAGE_INVITATION":
                setPageId(notification.sourceId);
                setIsJoinOpen(true);
                break;
            default:
                navigate(`/source/${notification.sourceId}`);
                break;
        }
    };

    const cancelJoin = () => {
        setIsJoinOpen(false)
        setPageId(null)
    };

    const proceedJoin = async () => {
        if (!pageId) return;

        try {
            await pageRepository.joinPage({
                session,
                pageId
            } as JoinPageReq);

            toast.success("Invitacion aceptada correctamente");

            setIsJoinOpen(false);
            setPageId(null);

            navigate(`/page/${pageId}`);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true})
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    return {
        loading,
        notifications,
        redirectToNotification,
        user,
        onLogout,
        isJoinOpen,
        cancelJoin,
        proceedJoin
    }
}
