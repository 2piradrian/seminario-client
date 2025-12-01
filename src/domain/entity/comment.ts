import { PageProfile } from "./page-profile.ts";
import { Profile } from "./profile.ts";
import { User } from "./user.ts";

export class Comment {

    constructor(
        public id: string,
        public author: User,
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
        if (!object) return null;

        return new Comment (
            object.id || object.commentId, 
            User.fromObject(object.author),
            PageProfile.fromObject(object.pageProfile),
            object.postId,
            Comment.fromObject(object.replyTo), 
            object.content, 
            object.upvotersQuantity,
            object.downvotersQuantity,
            object.createdAt,
            object.updatedAt
        )
    };

    public getProfile(): Profile {
        return Profile.fromEntity(this.author.profile, this.pageProfile);
    }
    
}