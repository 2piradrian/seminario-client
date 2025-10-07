import type { Sesion } from "../../../entity/sesion";

export interface TogglePostVotesReq {
    sesion: Sesion;
    voteType: string;
    postId: string;
}
