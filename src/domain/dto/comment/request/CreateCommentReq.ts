import type { Session } from "../../../entity/session.ts";

export interface CreateCommentReq {
    session: Session;
    postId: string;
    content: string;
    profileId: string;
    replyTo: string;
}
