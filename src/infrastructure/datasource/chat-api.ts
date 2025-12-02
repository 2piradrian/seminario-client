import { HTTPClient } from "../../core";
import {
    type ChatDatasourceI,
    type GetConversationPageReq,
    type GetConversationPageRes,
    ErrorHandler,
    type Error
} from "../../domain";

export class ChatApiDataSource implements ChatDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async getConversation(dto: GetConversationPageReq): Promise<GetConversationPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get(
                "/api/chat/get-conversation",
                params,
                session.getAccessToken()
            );

            if ((response as any)?.error) {
                throw ErrorHandler.handleError((response as any).error);
            }

            return response as GetConversationPageRes;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
