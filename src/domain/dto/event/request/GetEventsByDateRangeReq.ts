import type { Session } from "../../../entity/session";

export interface GetEventsByDateRangeReq {
    session: Session,
    userId: string,
    dateMonth: string,
}
