import type { Session } from "../../../entity/session";

export interface CreateReviewReq {
    reviewedUserId: string;
    review: string;
    rating: number;
    session: Session;
}