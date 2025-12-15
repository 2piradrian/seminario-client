import { Session } from "../../../entity/session";

export interface CancelEventReq {
    session: Session;
    eventId: string;
}