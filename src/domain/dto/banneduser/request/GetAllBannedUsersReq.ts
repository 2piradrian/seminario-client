import type { Session } from "../../../entity/session";

export interface GetAllBannedUsersReq {
    session: Session;
    page: number;
    size: number;
}