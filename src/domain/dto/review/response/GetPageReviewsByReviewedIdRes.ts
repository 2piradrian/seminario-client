import type { Review } from "../../../entity/review";

export interface GetPageReviewsByReviewedIdRes {
    reviews: Review[];
    nextPage: number;
}