import type { Category } from "../../../entity/category";
import type { Page } from "../../../entity/page";
import type { Post } from "../../../entity/post";
import type { User } from "../../../entity/user";

export interface GetPostByIdRes {
    author: User;
    post: Post;
    page: Page;
    image: string;
    title: string;
    content: string;
    views: number;
    upvoters: number;
    downvoters: number;
    category: Category;
    createdAt: Date;
}
