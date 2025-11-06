import type { Session } from "../../../entity/session";

export interface DeleteEventReq {
    eventId: string;
    session: Session;
}