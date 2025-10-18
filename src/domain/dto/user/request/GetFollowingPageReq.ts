import type { Session } from "../../../entity/session.ts";

export interface GetFollowingPageReq {
    userId: string;
    page: number;
    size: number;
    session: Session;
}