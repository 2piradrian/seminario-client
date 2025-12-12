import type { Session } from "../../../entity/session";

export interface GetUserMutualsFollowersReq {
    session: Session;
    userId: string;
}
