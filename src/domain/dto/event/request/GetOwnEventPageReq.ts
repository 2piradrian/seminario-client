import { Session } from "../../../entity/session.ts";

export interface GetOwnEventPageReq {
    session: Session
    page: number
    size: number
}