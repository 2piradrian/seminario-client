import type { Session } from "../../../entity/session.ts";

export interface TogglePostVotesReq {
    session: Session;
    voteType: string;
    postId: string;
}
