import type { Page } from "./page";
import type { UserProfile } from "./user-profile";

export class Post {

    constructor(
        public id: string,
        public title: string,
        public content: string,
        public views: number,
        public author: UserProfile,
        public page: Page,
        public upvoters: string[],
        public upvotersSize: number,
        public downvoters: string[],
        public downvotersSize: number,
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
            object.page,
            object.upvoters,
            object.upvoters.length,
            object.downvoters,
            object.downvoters.length,
            new Date(object.createdAt), 
            new Date(object.updatedAt),
            object.imageId
        )
    };
    
}
