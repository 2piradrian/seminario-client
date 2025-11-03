import type { Session } from "../../../entity/session.ts";

export interface RevokeRoleUserReq {
    session: Session;
    email: string;
}
