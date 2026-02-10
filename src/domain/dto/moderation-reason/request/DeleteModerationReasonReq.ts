import type { Session } from "../../../entity/session";

export interface DeleteModerationReasonReq {
    session: Session;
    id: string;
}