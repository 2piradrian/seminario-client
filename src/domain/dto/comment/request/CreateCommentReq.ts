import type { Sesion } from "../../../entity/sesion";

export interface CreateCommentReq {
    sesion: Sesion;
    postId: string;
    content: string;
    replyTo: string;
}
