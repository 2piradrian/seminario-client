import type { Page } from "../../../entity/page";
import type { UserProfile } from "../../../entity/user-profile";

export interface CreateCommentRes {
    id: string,
    author: UserProfile,
    page: Page,
    postId: string,
    replyTo: Comment,
    content: string,
    upvoters: number,
    downvoters: number,
    createdAt: Date,
    updatedAt: Date
}
