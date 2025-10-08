import type { Category } from "../../../entity/category";
import type { Page } from "../../../entity/page";
import type { UserProfile } from "../../../entity/user-profile";

export interface TogglePostVotesRes {
    postId: string;
    author: UserProfile;
    page: Page;
    imageId: string;
    title: string;
    content: string;
    views: number;
    upvoters: number;
    downvoters: number;
    category: Category;
    createdAt: Date;
}