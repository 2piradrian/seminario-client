import {
    type GetActiveChatsReq,
    type GetActiveChatsRes,
    type GetConversationPageReq,
    type GetConversationPageRes,
    ChatDatasourceI,
    ChatRepositoryI
} from "../../domain";
import { ChatApiDataSource } from "../datasource/chat-api";

export class ChatRepository implements ChatRepositoryI {

    private dataSource: ChatDatasourceI;

    constructor(datasource: ChatDatasourceI = new ChatApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getConversation(dto: GetConversationPageReq): Promise<GetConversationPageRes> {
        try {
            return await this.dataSource.getConversation(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getActiveChats(dto: GetActiveChatsReq): Promise<GetActiveChatsRes> {
        try {
            return await this.dataSource.getActiveChats(dto);
        }
        catch (error) {
            throw error;
        }
    }
}
