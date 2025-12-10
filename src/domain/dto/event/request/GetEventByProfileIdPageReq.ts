import type { Session } from "../../../entity/session";

export interface GetEventByProfileIdPageReq {
    session: Session;
    profileId: string;
    page: number;
    size: number;
}
