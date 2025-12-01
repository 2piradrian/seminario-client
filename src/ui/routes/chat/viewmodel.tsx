import { useEffect, useState, useMemo } from "react";
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

    useEffect(() => {
        if (session) {
            chatService.connect(session);
            
            chatService.onMessageReceived((message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        return () => {
            chatService.disconnect();
        };
    }, [session, chatService]);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim() && receiverId) {
            chatService.sendMessage({
                receiverId: receiverId,
                content: newMessage,
            });
            
            const message = ChatMessage.fromObject({
                senderId: userId,
                receiverId: receiverId,
                content: newMessage,
                createdAt: new Date().toISOString(),
            });
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage("");
        } 
        else {
            toast.error("Cannot send empty message or no receiver selected.");
        }
    };

    const isMyMessage = (message: ChatMessage): boolean => {
        return message.sender.id === userId;
    }

    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        isMyMessage,
    };
}
