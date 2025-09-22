import type { SesionDataSourceI } from "../../domain/datasource/sesion";
import type { SaveSesionReq } from "../../domain/dto/sesion/request/SaveSesionReq";
import type { GetSesionRes } from "../../domain/dto/sesion/response/GetSesionRes";

export class SesionLSDataSourceI implements SesionDataSourceI {

    public async getSesion(): Promise<GetSesionRes> {
        try {
            const sesion = localStorage.getItem("sesion");
            const sesionParsed = JSON.parse(sesion || "");

            if (!sesionParsed || sesionParsed === "") {
                throw new Error("No hay sesión guardada");
            }

            return sesionParsed as GetSesionRes;
        }
        catch (error) {
            throw new Error("Error obteniendo sesión");
        }
    }

    public async saveSesion(dto: SaveSesionReq): Promise<void> {
        try {
            const sesionString = JSON.stringify(dto.sesion);
            localStorage.setItem("sesion", sesionString);
        }
        catch (error) {
            throw new Error("Error guardando sesión");
        }
    }

    public async deleteSesion(): Promise<void> {
        try {
            localStorage.removeItem("sesion");
        }
        catch (error) {
            throw new Error("Error eliminando sesión");
        }
    }

}