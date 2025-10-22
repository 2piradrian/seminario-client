import type { Session } from "../../../entity/session.ts";

export interface ToggleCommentVotesReq {
    session: Session;
    voteType: string;
    commentId: string;
} 
