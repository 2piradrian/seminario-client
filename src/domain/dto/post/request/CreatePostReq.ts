import { Session } from "../../../entity/session.ts";

export interface CreatePostReq {
    session: Session;
    title: string;
    content: string;
    profileId: string;
    image: string;
    postTypeId: string;
}
