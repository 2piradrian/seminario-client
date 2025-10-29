import type { Session } from "../../../entity/session.ts";

export interface ToggleFollowReq {
    session: Session;
    id: string;
}