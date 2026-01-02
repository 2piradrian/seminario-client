import type { GetNotificationPageReq } from "../dto/notification/request/GetNotificationPageReq";
import type { MarkAsReadReq } from "../dto/notification/request/MarkAsReadReq";
import type { GetNotificationPageRes } from "../dto/notification/response/GetNotificationPageRes";

export abstract class NotificationDatasourceI {
    abstract getNotificationsByTarget(dto: GetNotificationPageReq):Promise<GetNotificationPageRes>;
    abstract markAsRead(dto: MarkAsReadReq):Promise<void>;    
}