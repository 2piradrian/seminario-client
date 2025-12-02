import type { GetActiveChatsReq } from "../dto/chat/request/GetActiveChatsReq";
import type { GetConversationPageReq } from "../dto/chat/request/GetConversationPageReq";
import type { GetActiveChatsRes } from "../dto/chat/response/GetActiveChatsRes";
import type { GetConversationPageRes } from "../dto/chat/response/GetConversationPageRes";

export abstract class ChatDatasourceI {
    abstract getConversation(dto: GetConversationPageReq): Promise<GetConversationPageRes>;
    abstract getActiveChats(dto: GetActiveChatsReq): Promise<GetActiveChatsRes>; 
}
