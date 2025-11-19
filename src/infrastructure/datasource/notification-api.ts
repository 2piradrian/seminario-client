import { HTTPClient } from "../../core";
import { ErrorHandler, NotificationDatasourceI, type GetNotificationPageReq, type GetNotificationPageRes } from "../../domain";

export class NotificationApiDataSource implements NotificationDatasourceI {

    private httpClient: HTTPClient;
    
    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getNotificationsByTarget(dto: GetNotificationPageReq): Promise<GetNotificationPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/notifications/get-by-target", params, session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            console.log(error)
            throw ErrorHandler.handleError(error as Error);
        }
    }

}