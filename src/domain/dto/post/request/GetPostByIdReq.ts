import { Session } from './../../../entity/session';

export interface GetPostByIdReq {
    session: Session;
    postId: string;
}