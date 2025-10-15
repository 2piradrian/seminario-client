import type { Session } from "../../../entity/session.ts";
import type { Vote } from "../../../entity/vote";

export interface ToggleCommentVotesReq {
    session: Session;
    voteType: string;
    commentId: string;
} 
