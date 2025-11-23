import type { Session } from "../../../entity/session";

export interface GetCommentByIdReq {
    session: Session;
    commentId: string;
}
