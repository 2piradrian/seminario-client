import { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
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

    const { trigger } = useScrollLoadingTop();
    const [messagePage, setMessagePage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiverUser, setReceiverUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const scrollHeightRef = useRef(0);

    useLayoutEffect(() => {
        if (scrollHeightRef.current > 0) {
            const newScrollHeight = document.documentElement.scrollHeight;
            const heightDifference = newScrollHeight - scrollHeightRef.current;
            if (heightDifference > 0) {
                window.scrollTo(0, heightDifference);
            }
            scrollHeightRef.current = 0;
        }
    }, [messages]);

    const enhanceMessage = useCallback(
        (message: ChatMessage) => {
            if (!message) return message;

            const senderId = message.senderId ?? message.sender?.id;
            const receiverIdMessage = message.receiverId ?? message.receiver?.id;
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

        setMessages([]);
        Promise.all([fetchReceiverUser(), fetchCurrentUser()]).then();
    }, [session, receiverId, userId]);

    useEffect(() => {
        // This effect triggers when the user scrolls to the top.
        // We prevent it from running on initial load by checking if trigger > 1.
        if (canScroll && session != null && trigger > 1) {
            scrollHeightRef.current = document.documentElement.scrollHeight;
            // We increment the page number to fetch the next batch of older messages.
            setMessagePage(trigger);
        }
    }, [trigger]);

    useEffect(() => {
        // This effect runs when the messagePage state changes, ensuring we fetch with the updated page number.
        // We only fetch for pages greater than 1, as the initial fetch is handled by the useEffect that depends on [session, receiverId].
        const getConversation = async () => {
            await fetchConversation();
        }
        if (messagePage > 1 && canScroll) {
            getConversation();
        }
    }, [messagePage]);

    useEffect(() => {
        if (!messages.length) return;
        setMessages(prev => prev.map(enhanceMessage));
    }, [enhanceMessage]);

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

    const scrollToBottom = () => {
        const container = document.getElementById("chat-messages");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    const fetchConversation = async () => {
        try {
            const response = await chatRepository.getConversation({
                session,
                page: messagePage,
                size: 1, // Increased page size for better loading experience
                user1Id: userId,
                user2Id: receiverId
            });
            if (!response.messages || response.messages.length === 0) {
                setCanScroll(false);
                if (messagePage === 1) setMessages([]);
                return;
            }
            const newMessages = response.messages.map(m => enhanceMessage(ChatMessage.fromObject(m)));
            if (messagePage === 1) {
                setMessages(newMessages);
            }
            else {
                // Prepend older messages to the beginning of the array
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
            toast.error("Cannot send empty message");
            return;
        }

        chatService.sendMessage({
            receiverId,
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
        onLogout
    };
}
