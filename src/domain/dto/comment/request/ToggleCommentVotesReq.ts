import type { Sesion } from "../../../entity/sesion";
import type { Vote } from "../../../entity/vote";

export interface ToggleCommentVotesReq {
    sesion: Sesion;
    voteType: Vote;
    commentId: string;
} 
