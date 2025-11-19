import { HTTPClient } from "../../core";
import { ErrorHandler, NotificationDatasourceI, type GetNotificationPageReq, type GetNotificationPageRes } from "../../domain";

export class NotificationApiDataSource implements NotificationDatasourceI {

    private httpClient: HTTPClient;
    
    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getNotificationPage(dto: GetNotificationPageReq): Promise<GetNotificationPageRes> {
        try {
            const response = await this.httpClient.post("/notifications/get-by-target", { ... dto}, dto.session.getAccessToken());

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