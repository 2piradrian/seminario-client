import type { PageProfile } from "../../../entity/page-profile.ts"
import type { UserProfile } from "../../../entity/user-profile"

export interface ToggleCommentVoteRes {
    commentId: string
    author: UserProfile
    postId: string
    replyTo: Comment
    content: string
    upvoters: number
    downvoters: number
    createdAt: Date
    updatedAt: Date
    page: PageProfile
}