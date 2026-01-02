import type { Session } from "../../../entity/session";

export interface MarkAsReadReq {
    session: Session;
    notificationId: string;
}