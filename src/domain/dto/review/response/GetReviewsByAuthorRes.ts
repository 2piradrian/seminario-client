import type { Review } from "../../../entity/review";

export interface GetReviewsByAuthorRes {
    reviews: Review[];
    nextPage: number;
}