import type { Session } from "../../../entity/session";

export interface GetStyleByIdReq {
    session: Session;
    id: string;
}