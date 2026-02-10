import type { Session } from "../../../entity/session";

export interface EditStyleReq {
    session: Session;
    id: string;
    name: string;
}