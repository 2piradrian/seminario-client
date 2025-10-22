import { Session } from './../../../entity/session';

export interface GetPostPageReq {
    session: Session;
    page: number;
    size: number;
}
