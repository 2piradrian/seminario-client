import type { PageProfile } from "./page-profile.ts";
import type { UserProfile } from "./user-profile";

export class Comment {

    constructor(
        public id: string,
        public author: UserProfile,
        public pageProfile: PageProfile,
        public postId: string,
        public replyTo: Comment,
        public content: string,
        public upvotersQuantity: number,
        public downvotersQuantity: number,
        public createdAt: Date,
        public updatedAt: Date

    ){}

    public static fromObject(object: {[key: string]: any}): Comment {
        return new Comment (
            object.id || object.commentId, 
            object.author,
            object.pageProfile,
            object.postId,
            object.replyTo, 
            object.content, 
            object.upvotersQuantity,
            object.downvotersQuantity,
            object.createdAt,
            object.updatedAt
        )
    };
    
}