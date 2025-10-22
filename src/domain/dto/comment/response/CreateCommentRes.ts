import type { PageProfile } from "../../../entity/page-profile.ts";
import type { UserProfile } from "../../../entity/user-profile";

export interface CreateCommentRes {
    id: string,
    author: UserProfile,
    page: PageProfile,
    postId: string,
    replyTo: Comment,
    content: string,
    upvotersQuantity: number,
    downvotersQuantity: number,
    createdAt: Date,
    updatedAt: Date
}
