import type { Session } from "../../../domain/entity/session";
import { ChatMessage } from "../../../domain/entity/chat";
import { env } from "../../../core";

type ChatMessageCallback = (message: ChatMessage) => void;

export class ChatService {
    private socket: WebSocket | null = null;
    private onMessageCallback: ChatMessageCallback | null = null;

    private readonly BASE_URL = env.WEBSOCKET_URL;

    public connect(session: Session): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }

        if (!this.BASE_URL) {
            return;
        }
        
        const token = session.getAccessToken();
        if (!token) {
            return;
        }

        const url = `${this.BASE_URL}?token=${token}`;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
        };

        this.socket.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                const chatMessage = ChatMessage.fromObject(messageData);
                if (this.onMessageCallback) {
                    this.onMessageCallback(chatMessage);
                }
            } 
            catch (error) {
            }
        };

    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    public sendMessage(message: { receiverId: string; content: string }): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } 
        else {
            console.error("WebSocket is not connected. Cannot send message.");
        }
    }

    public onMessageReceived(callback: ChatMessageCallback): void {
        this.onMessageCallback = callback;
    }
}

