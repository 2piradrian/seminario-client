import type { Session } from "../../../entity/session";

export interface GetPageByUserIdReq {
    session: Session;
    userId: string;
}
