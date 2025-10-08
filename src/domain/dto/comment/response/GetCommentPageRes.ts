import type { Comment } from "../../../entity/comment";

export interface GetCommentPageRes {
    comments: Comment[];
    nextPage: number;
} 
