import type { Status } from "../../../entity/status";

export interface GetReviewByIdRes{
    id: string;
    reviewedId: string;
    reviewerUserId: string;
    review: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    status: Status;
}