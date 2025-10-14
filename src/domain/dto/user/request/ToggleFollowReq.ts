import type { Sesion } from "../../../entity/sesion";

export interface ToggleFollowReq {
    sesion: Sesion;
    id: string;
}