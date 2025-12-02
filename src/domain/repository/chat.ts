import type { GetConversationPageReq } from "../dto/chat/request/GetConversationPageReq";
import type { GetConversationPageRes } from "../dto/chat/response/GetConversationPageRes";

export abstract class ChatRepositoryI {
    abstract getConversation(dto: GetConversationPageReq): Promise<GetConversationPageRes>;
}
