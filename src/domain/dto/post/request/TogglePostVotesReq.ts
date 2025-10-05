import type { Sesion } from "../../../entity/sesion";
import type { Vote } from "../../../entity/vote";

export interface TogglePostVotesReq {
    sesion: Sesion;
    voteType: string;
    postId: string;
}
