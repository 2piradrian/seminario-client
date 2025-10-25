import { Session } from "../../../entity/session.ts";

export interface GetEventByIdReq {
    eventId: string;
    session: Session;
}