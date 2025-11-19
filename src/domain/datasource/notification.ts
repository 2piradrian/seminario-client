import type { GetNotificationPageReq } from "../dto/notification/request/GetNotificationPageReq";
import type { GetNotificationPageRes } from "../dto/notification/response/GetNotificationPageRes";

export abstract class NotificationDatasourceI {
    abstract getNotificationsByTarget(dto: GetNotificationPageReq):Promise<GetNotificationPageRes>
}