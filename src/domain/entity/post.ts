import type { Category } from "./category";
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
        public upvoters: number,
        public downvoters: number,
        public category: Category,
        public createdAt: Date,
        public updatedAt: Date,
        public imageId: string
    ){}

    public static fromObject(object: {[key: string]: any}): Post {
        return new Post(
            object.id, 
            object.title, 
            object.content, 
            object.views, 
            object.author,
            object.page,
            object.upvoters,
            object.downvoters,
            object.category, 
            object.createdAt, 
            object.updatedAt,
            object.imageId
        )
    };
    
}
