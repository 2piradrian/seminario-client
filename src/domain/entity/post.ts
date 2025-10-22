import type { PageProfile } from "./page-profile.ts";
import type { UserProfile } from "./user-profile";

export class Post {

    constructor(
        public id: string,
        public title: string,
        public content: string,
        public views: number,
        public author: UserProfile,
        public pageProfile: PageProfile,
        public upvotersQuantity: number,
        public downvotersQuantity: number,
        public createdAt: Date,
        public updatedAt: Date,
        public imageId: string
    ){}

    public static fromObject(object: {[key: string]: any}): Post {
        return new Post(
            object.id || object.postId, 
            object.title, 
            object.content, 
            object.views, 
            object.author,
            object.pageProfile,
            object.upvotersQuantity,
            object.downvotersQuantity,
            new Date(object.createdAt), 
            new Date(object.updatedAt),
            object.imageId
        )
    };
    
}
