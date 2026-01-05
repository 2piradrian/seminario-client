import type { Session } from "../../../entity/session";

export interface GetAssistantsByEventIdReq {
    session: Session;
    eventId: string;
    page: number;
    size: number;
}