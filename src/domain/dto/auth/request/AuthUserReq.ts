import type { Session } from "../../../entity/session.ts";

export interface AuthUserReq {
    session: Session;
}