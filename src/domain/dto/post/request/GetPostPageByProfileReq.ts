import { Session } from './../../../entity/session';

export interface GetPostPageByProfileReq{
    session: Session;
    page: number
    size: number
    profileId: string
}