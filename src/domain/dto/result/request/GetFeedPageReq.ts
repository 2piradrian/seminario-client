import type { Session } from "../../../entity/session.ts";

export interface GetFeedPageReq {
    page: number;
    size: number;
    session: Session;
}   