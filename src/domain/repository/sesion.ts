import type { SaveSesionReq } from "../dto/sesion/request/SaveSesionReq";
import type { GetSesionRes } from "../dto/sesion/response/GetSesionRes";

export abstract class SesionRepositoryI {
    abstract getSesion(): Promise<GetSesionRes>;
    abstract saveSesion(dto: SaveSesionReq): Promise<void>;
    abstract deleteSesion(): Promise<void>;
}