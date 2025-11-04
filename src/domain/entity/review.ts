import type { UserProfile } from "./user-profile";

export class Review {

    constructor(
        public id: string,
        public reviewedUser: UserProfile,
        public reviewerUser: UserProfile,
        public review: string,
        public rating: number
    ){}

    public static fromObject(object: {[key: string]: any}): Review {
        return new Review(
            object.id || object.reviewId,
            object.reviewedUser,
            object.reviewerUser,
            object.review, 
            object.rating
        )
    };
    
}