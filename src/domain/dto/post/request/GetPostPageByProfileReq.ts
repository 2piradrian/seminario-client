import { Session } from './../../../entity/session';

export interface GetPostPageByProfileReq{
    page: number
    size: number
    profileId: string
    session: Session;
}