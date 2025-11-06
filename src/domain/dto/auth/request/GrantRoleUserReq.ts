import type { Session } from "../../../entity/session.ts";

export interface GrantRoleUserReq {
    session: Session;
    email: string;
    roleId: string;
}
