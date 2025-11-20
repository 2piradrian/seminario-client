import type { GetNotificationPageRes } from '../dto/notification/response/GetNotificationPageRes';
import type { GetNotificationPageReq } from './../dto/notification/request/GetNotificationPageReq';

export abstract class NotificationRepositoryI{
    abstract getNotificationsByTarget(dto: GetNotificationPageReq): Promise<GetNotificationPageRes> 
}