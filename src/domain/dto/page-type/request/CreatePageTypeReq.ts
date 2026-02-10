import type { Session } from "../../../entity/session";

export interface CreatePageTypeReq {
    session: Session;
    name: string;
}