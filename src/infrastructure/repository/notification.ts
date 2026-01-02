import type { GetNotificationPageReq, GetNotificationPageRes, NotificationDatasourceI, NotificationRepositoryI } from "../../domain";
import type { MarkAsReadReq } from "../../domain/dto/notification/request/MarkAsReadReq";
import { NotificationApiDataSource } from "../datasource/notification-api";

export class NotificationRepository implements NotificationRepositoryI {

    private dataSource: NotificationDatasourceI;
    
    constructor(datasource: NotificationDatasourceI = new NotificationApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getNotificationsByTarget(dto: GetNotificationPageReq): Promise<GetNotificationPageRes> {
        try {
            return await this.dataSource.getNotificationsByTarget(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async markAsRead(dto: MarkAsReadReq): Promise<void> {
        try {
            return await this.dataSource.markAsRead(dto);
        }
        catch (error) {
            throw error;
        }
    }

}
