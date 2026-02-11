import type { Session } from "../../../entity/session.ts";

export interface DeletePostReq {
    session: Session;
    postId: string;
    reasonId: string;
}
