import type { Session } from "../../../entity/session";

export interface DeletePageTypeReq {
    session: Session;
    id: string;
}