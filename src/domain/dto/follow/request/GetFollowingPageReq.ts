import type { Session } from "../../../entity/session.ts";

export interface GetFollowingPageReq {
    subjectId: string;
    page: number;
    size: number;
    session: Session
}