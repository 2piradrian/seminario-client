import type { Session } from "../../../entity/session";

export interface EditModerationReasonReq {
    session: Session;
    id: string;
    name: string;
}