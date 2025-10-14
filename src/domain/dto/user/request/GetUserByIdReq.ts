import type { Sesion } from "../../../entity/sesion";

export interface GetUserByIdReq {
    sesion: Sesion;
    userId: string;
}