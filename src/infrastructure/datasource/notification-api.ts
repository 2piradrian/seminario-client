import { HTTPClient } from "../../core";
import { ErrorHandler, NotificationDatasourceI, type GetNotificationPageReq, type GetNotificationPageRes } from "../../domain";
import type { MarkAsReadReq } from "../../domain/dto/notification/request/MarkAsReadReq";

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
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async markAsRead(dto: MarkAsReadReq): Promise<void> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.patch(`/api/notifications/${dto.notificationId}/read`, params, session.getAccessToken());   

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;

        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}