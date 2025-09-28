import type { Sesion } from "../../../entity/sesion";

export interface EditPostReq {
    sesion: Sesion;
    title: string;
    content: string;
    image: string; 
}