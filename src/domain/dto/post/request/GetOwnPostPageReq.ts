import type { Sesion } from "../../../entity/sesion"

export interface GetOwnPostPageReq {
    sesion: Sesion
    page: number
    size: number
}