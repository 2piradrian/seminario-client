import { useEffect, useState, useCallback } from "react";
import { useRepositories, useServices } from "../../../core";
import { ChatMessage, Errors, type GetUserByIdReq, User } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoadingTop } from "../../hooks/useScrollLoadingTop";

export function ViewModel() {

    const navigate = useNavigate();

    const { receiverId } = useParams();
    const { chatService } = useServices();
    const { userRepository, sessionRepository, chatRepository } = useRepositories();
    const { userId, session } = useSession();

    const { trigger, handleScroll } = useScrollLoadingTop();
    const [messagePage, setMessagePage] = useState<number | null>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiverUser, setReceiverUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

    {/* ===== Utils ===== */ }

    const enhanceMessage = useCallback(
        (message: ChatMessage) => {

            if (!message) return message;

            const senderId = message.sender?.id;
            const receiverIdMessage = message.receiver?.id;
            const mine =
                senderId === userId ||
                receiverIdMessage === receiverId ||
                receiverIdMessage === userId && senderId === undefined;

            const senderUser = mine ? currentUser ?? message.sender : receiverUser ?? message.sender;
            const receiverUserResolved = mine ? receiverUser ?? message.receiver : currentUser ?? message.receiver;

            return ChatMessage.fromObject({
                ...message,
                sender: senderUser,
                receiver: receiverUserResolved,
                createdAt: message.createdAt,
            });

        },
        [currentUser, receiverUser, userId, receiverId]
    );

    const handleIncomingMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, enhanceMessage(message)]);
    }, [enhanceMessage]);

    {/* ===== Main user effects ===== */ }

    useEffect(() => {
        if (!session) return;

        chatService.connect(session);
        chatService.onMessageReceived(handleIncomingMessage);

        return () => {
            chatService.disconnect();
        };
    }, [session, chatService, handleIncomingMessage]);

    useEffect(() => {
        if (!session || !receiverId) return;

        fetchData();

    }, [session, receiverId, userId]);

    useEffect(() => {
        if (canScroll && session != null) {
            setMessagePage(trigger);
        }
    }, [trigger]);

    useEffect(() => {
        if (messagePage !== null && currentUser && receiverUser) {
            fetchConversation();
        }
    }, [messagePage, currentUser, receiverUser]);

    useEffect(() => {
        if (!messages.length) return;

        setMessages(prev => prev.map(enhanceMessage));

    }, [enhanceMessage]);

    useEffect(() => {
        if (shouldScrollToBottom) {
            scrollToBottom();
            setShouldScrollToBottom(false);
        }
    }, [messages, shouldScrollToBottom]);

    {/* ===== Fetch data ===== */ }

    const fetchData = async () => {
        setMessages([]);
        setMessagePage(1);
        scrollToBottom();

        await Promise.all([fetchReceiverUser(), fetchCurrentUser()]);
    }

    const fetchReceiverUser = async () => {
        try {

            const response = await userRepository.getById({
                session,
                userId: receiverId
            } as GetUserByIdReq);

            setReceiverUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchConversation = async () => {
        try {

            const response = await chatRepository.getConversation({
                session,
                page: messagePage,
                size: 15,
                user1Id: userId,
                user2Id: receiverId
            });

            if (!response.messages || response.messages.length === 0) {
                setCanScroll(false);
                if (messagePage === 1) setMessages([]);
                return;
            }

            const newMessages = response.messages.map(m => enhanceMessage(ChatMessage.fromObject(m))).reverse();

            if (messagePage === 1) {
                setMessages(newMessages);
                setShouldScrollToBottom(true);
            }
            else {
                setMessages(prevMessages => [
                    ...newMessages,
                    ...prevMessages
                ]);
            }

        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setCurrentUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    {/* ===== Handlers ===== */ }

    const scrollToBottom = () => {
        const container = document.getElementById("chat-messages");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };


    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!receiverId) {
            toast.error("No receiverId");
            return;
        }

        if (!userId) {
            toast.error("No hay sesión activa");
            return;
        }

        if (!newMessage.trim()) {
            toast.error("No se puede enviar un mensaje vacio");
            return;
        }

        chatService.sendMessage({
            receiver: User.fromObject({ id: receiverId }),
            content: newMessage,
        });

        const optimisticMessage = enhanceMessage(
            ChatMessage.fromObject({
                sender: { id: userId },
                receiver: { id: receiverId },
                content: newMessage,
                createdAt: new Date().toISOString(),
            })
        );

        setMessages(prev => [...prev, optimisticMessage]);
        setNewMessage("");
        scrollToBottom();
    };

    const isMyMessage = useCallback(
        (message: ChatMessage) => message.sender?.id === userId,
        [userId]
    );

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true })
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        isMyMessage,
        currentUser,
        onLogout,
        handleScroll
    };
}
