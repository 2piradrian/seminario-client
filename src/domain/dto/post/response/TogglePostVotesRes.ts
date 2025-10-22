import type { Category } from "../../../entity/category";
import type { PageProfile } from "../../../entity/page-profile.ts";
import type { UserProfile } from "../../../entity/user-profile";

export interface TogglePostVotesRes {
    postId: string;
    author: UserProfile;
    page: PageProfile;
    imageId: string;
    title: string;
    content: string;
    views: number;
    upvotersQuantity: number;
    downvotersQuantity: number;
    category: Category;
    createdAt: Date;
}