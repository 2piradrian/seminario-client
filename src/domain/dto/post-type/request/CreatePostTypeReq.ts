import type { Session } from "../../../entity/session";

export interface CreatePostTypeReq {
    session: Session;
    name: string;
}