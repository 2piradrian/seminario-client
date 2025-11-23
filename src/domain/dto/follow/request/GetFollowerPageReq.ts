import type { Session } from "../../../entity/session.ts";

export interface GetFollowerPageReq {
    subjectId: string;
    page: number;
    size: number;
    session: Session
}