import type { Session } from "../../../entity/session";

export interface GetFeedMergedByProfileIdPageReq {
    page: number;
    size: number;
    session: Session;
    profileId: string;
}
