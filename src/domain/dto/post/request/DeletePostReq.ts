import type { Sesion } from "../../../entity/sesion";

export interface DeletePostReq {
  sesion: Sesion;
  postId: string;
}