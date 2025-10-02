import type { Sesion } from "../../../entity/sesion";

export interface DeleteCommentReq {
    sesion: Sesion;
    commentId: string;
} 
