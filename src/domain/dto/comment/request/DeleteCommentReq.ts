import type { Session } from "../../../entity/session.ts";

export interface DeleteCommentReq {
    session: Session;
    commentId: string;
    reasonId: string;
} 
