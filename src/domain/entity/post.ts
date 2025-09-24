import type { Category } from "./category";

export class Post {

    constructor(
        public id: string,
        public title: string,
        public content: string,
        public views: number,
        public authorId: string,
        public upvoters: string[],
        public downvoters: string[],
        public category: Category,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static Post(object: {id: string, title: string, content: string, views: number, authorId: string,
        upvoters: string[], downvoters: string[], category: Category, createdAt: Date, updatedAt: Date
    }): Post {
        return new Post(
            object.id, 
            object.title, 
            object.content, 
            object.views, 
            object.authorId, 
            object.upvoters,
            object.downvoters,
            object.category, 
            object.createdAt, 
            object.updatedAt
        )
    };
}