import type { Session } from "../../../entity/session.ts"

export interface GetOwnPostPageReq {
    session: Session
    page: number
    size: number
}