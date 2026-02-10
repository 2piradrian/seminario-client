import type { Session } from "../../../entity/session";

export interface GetPostTypeByIdReq {
    session: Session;
    id: string;
}