import { Sesion } from "../../../entity/sesion";

export interface CreatePostReq {
    sesion: Sesion;
    title: string;
    content: string;
    image: string;   
}