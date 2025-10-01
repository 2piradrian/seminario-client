import type { Post } from "../../../entity/post";
import type { Sesion } from "../../../entity/sesion";
import type { Vote } from "../../../entity/vote";

export interface TogglePostVotesReq {
    token: Sesion;
    voteType: Vote;
    post: Post;
}
