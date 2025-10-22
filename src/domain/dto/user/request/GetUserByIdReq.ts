import type { Session } from "../../../entity/session.ts";

export interface GetUserByIdReq {
    session: Session;
    userId: string;
}