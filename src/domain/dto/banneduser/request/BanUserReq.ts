import type { Session } from "../../../entity/session";

export interface BanUserReq {
    session: Session;
    userId: string;
    reasonId: string;
}
