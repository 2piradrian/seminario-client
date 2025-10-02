import type { Category } from "../../../entity/category";

export interface GetPostByIdRes {
    authorId: string;
    postId: string;
    pageId: string;
    imageId: string;
    title: string;
    content: string;
    views: number;
    upvoters: number;
    downvoters: number;
    category: Category;
    createdAt: Date;
}
