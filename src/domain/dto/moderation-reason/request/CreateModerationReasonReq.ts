import type { Session } from "../../../entity/session";

export interface CreateModerationReasonReq {
    session: Session;
    name: string;
}