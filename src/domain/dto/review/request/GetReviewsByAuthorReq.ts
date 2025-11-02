import type { Session } from "../../../entity/session";

export interface GetReviewsByAuthorReq {
    page: number;
    size: number;
    session:Session;
}