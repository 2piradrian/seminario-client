import type { Session } from "../../../entity/session";

export interface GetReviewByIdReq{
    reviewId: string;
    session: Session;
}