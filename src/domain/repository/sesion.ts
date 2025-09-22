import type { Sesion } from "../entity/sesion";

export abstract class SesionRepositoryI {
    abstract getSesion(): Promise<Sesion>;
    abstract saveSesion(sesion: Sesion): Promise<void>;
    abstract deleteSesion(): Promise<void>;
}