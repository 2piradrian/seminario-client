import { useEffect, useState, useCallback } from "react";
import { useServices } from "../../../core";
import { ChatMessage } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function ViewModel() {

    const { receiverId } = useParams();
    const { chatService } = useServices();
    const { userId, session } = useSession();

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const handleIncomingMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    }, []);

    useEffect(() => {
        if (!session) return;

        chatService.connect(session);
        chatService.onMessageReceived(handleIncomingMessage);

        return () => {
            chatService.disconnect();
        };
    }, [session, chatService, handleIncomingMessage]);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!receiverId) {
            toast.error("No receiverId");
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

        const message = ChatMessage.fromObject({
            senderId: userId,
            receiverId,
            content: newMessage,
            createdAt: new Date().toISOString(),
        });

        setMessages(prev => [...prev, message]);
        setNewMessage("");
    };

    const isMyMessage = useCallback(
        (message: ChatMessage) => message.sender.id === userId,
        [userId]
    );

    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        isMyMessage,
    };
}
