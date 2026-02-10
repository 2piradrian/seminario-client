import type { Session } from "../../../entity/session";

export interface EditPageTypeReq {
    session: Session;
    id: string;
    name: string;
}