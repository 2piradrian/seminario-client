import type { Sesion } from "../../../entity/sesion";

export interface CreatePageReq {
    sesion: Sesion;
    name: string;
    idPageType: string;
}
