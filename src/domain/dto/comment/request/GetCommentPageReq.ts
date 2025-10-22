import { Session } from './../../../entity/session';

export interface GetCommentPageReq {
    session: Session;
    postId: string;
    page: number;
    size: number;
}
