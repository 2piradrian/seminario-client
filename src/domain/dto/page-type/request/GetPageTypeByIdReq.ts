import type { Session } from "../../../entity/session";

export interface GetPageTypeByIdReq {
    session: Session;
    id: string;
}