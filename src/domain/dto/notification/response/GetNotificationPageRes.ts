import type { Notification } from "../../../entity/notification";

export interface GetNotificationPageRes {
    notifications: Notification[];
    nextPage: number;
}