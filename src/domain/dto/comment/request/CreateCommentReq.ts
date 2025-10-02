import type { Sesion } from "../../../entity/sesion";

export interface CreateCommentRes {
    sesion: Sesion;
    postId: string;
    content: string;
    replyTo: string;
}
