import { Session } from "../../../entity/session.ts";

export interface GetEventAndAssistsPageReq {
    session: Session;
    userId: string;
    page: number;
    size: number;
}