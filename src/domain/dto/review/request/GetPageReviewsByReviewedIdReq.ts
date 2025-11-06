import type { Session } from "../../../entity/session";

export interface GetPageReviewsByReviewedIdReq {
    userId: string;
    page: number;
    size: number;
    session:Session
}