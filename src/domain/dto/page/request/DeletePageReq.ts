import type { Sesion } from "../../../entity/sesion";

export interface DeletePageReq{
    sesion: Sesion;
    pageId: string;
}
