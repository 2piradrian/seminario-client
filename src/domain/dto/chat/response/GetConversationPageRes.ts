import type { ChatMessage } from "../../../entity/chat-message";

export interface GetConversationPageRes {
    messages: ChatMessage[];
    nextPage: number | null;
}
