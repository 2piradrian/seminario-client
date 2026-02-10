import type { Session } from "../../../entity/session";

export interface DeletePostTypeReq {
    session: Session;
    id: string;
}