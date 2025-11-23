import type { Session } from "../../../entity/session";

export interface GetNotificationPageReq {
    page: number;
    size: number;
    session: Session;
    targetId: string;
}