import type { Session } from "../../../entity/session.ts";

export interface GetFollowerPageReq {
    userId: string;
    page: number;
    size: number;
    session: Session;
}