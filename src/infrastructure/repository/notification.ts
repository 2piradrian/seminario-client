import type { GetNotificationPageReq, GetNotificationPageRes, NotificationDatasourceI, NotificationRepositoryI } from "../../domain";
import { NotificationApiDataSource } from "../datasource/notification-api";

export class NotificationRepository implements NotificationRepositoryI {

    private dataSource: NotificationDatasourceI;
    
    constructor(datasource: NotificationDatasourceI = new NotificationApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getNotificationPage(dto: GetNotificationPageReq): Promise<GetNotificationPageRes> {
        try {
            return await this.dataSource.getNotificationPage(dto);
        } 
        catch (error) {
            throw error;
        }
    }

}
