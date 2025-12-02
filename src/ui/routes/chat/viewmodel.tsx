import { useEffect, useState, useCallback } from "react";
import { useRepositories, useServices } from "../../../core";
import { ChatMessage, Errors, type GetUserByIdReq, User } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function ViewModel() {
    
    const { receiverId } = useParams();
    const { chatService } = useServices();
    const { userRepository } = useRepositories();
    const { userId, session } = useSession();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiverUser, setReceiverUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
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

    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        isMyMessage,
        currentUser,
    };
}
