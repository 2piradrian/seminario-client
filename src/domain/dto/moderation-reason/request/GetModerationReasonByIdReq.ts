import type { Session } from "../../../entity/session";

export interface GetModerationReasonByIdReq {
    session: Session;
    id: string;
}