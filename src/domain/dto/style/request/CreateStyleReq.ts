import type { Session } from "../../../entity/session";

export interface CreateStyleReq {
    session: Session;
    name: string;
}