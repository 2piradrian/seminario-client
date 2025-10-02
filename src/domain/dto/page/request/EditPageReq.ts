import type { Sesion } from "../../../entity/sesion";

export interface EditPageReq {
    sesion: Sesion;    
    name: string;
    image: string;
    ownerId: string;
    members: string[];
}
