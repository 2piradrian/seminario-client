import type { Session } from "../../../entity/session.ts";

export interface GetFeedPostPageReq {
    page: number;
    size: number;
    session: Session;
}   