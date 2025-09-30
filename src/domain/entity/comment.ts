import type { UserProfile } from "./user-profile";

export class Comment {

    constructor(
        public id: string,
        public author: UserProfile,
        public postId: string,
        public replyTo: Comment,
        public content: string,
        public upvoters: number,
        public downvoters: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static fromObject(object: {[key: string]: any}): Comment {
        return new Comment (
            object.id, 
            object.author,
            object.postId,
            object.replyTo, 
            object.content, 
            object.upvoters,
            object.downvoters,
            object.createdAt,
            object.updatedAt
        )
    };
    
}