import type { Session } from "../../../entity/session";

export interface DeleteStyleReq {
    session: Session;
    id: string;
}