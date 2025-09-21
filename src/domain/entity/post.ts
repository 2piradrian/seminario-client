import type { Category } from "./category";

export interface Post {
    id: string;
    title: string;
    content: string;
    views: number;
    authorId: string;
    upvoters: string[];
    downvoters: string[];
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}