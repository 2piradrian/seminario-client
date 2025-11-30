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
            console.log("WebSocket is already connected.");
            return;
        }

        if (!this.BASE_URL) {
            console.error("WebSocket URL is not configured in environment variables.");
            return;
        }
        
        const token = session.getAccessToken();
        if (!token) {
            console.error("No access token found in session.");
            return;
        }

        const url = `${this.BASE_URL}?token=${token}`;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        this.socket.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                const chatMessage = ChatMessage.fromObject(messageData);
                if (this.onMessageCallback) {
                    this.onMessageCallback(chatMessage);
                }
            } catch (error) {
                console.error("Error parsing incoming message:", error);
            }
        };

        this.socket.onclose = (event) => {
            console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
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
        } else {
            console.error("WebSocket is not connected. Cannot send message.");
        }
    }

    public onMessageReceived(callback: ChatMessageCallback): void {
        this.onMessageCallback = callback;
    }
}

