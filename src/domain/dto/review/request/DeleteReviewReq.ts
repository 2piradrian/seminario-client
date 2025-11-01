import type { Session } from "../../../entity/session";

export interface DeleteReviewReq {
    id: string;
    session: Session;
}