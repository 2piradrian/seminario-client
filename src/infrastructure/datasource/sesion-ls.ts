import type { GetSesionRes, SaveSesionReq, SesionDataSourceI } from "../../domain";
import { Errors } from "../../domain";

export class SesionLSDataSourceI implements SesionDataSourceI {

    public async getSesion(): Promise<GetSesionRes> {
        try {
            const sesion = localStorage.getItem("sesion");
            const sesionParsed = JSON.parse(sesion || "");

            if (!sesionParsed || sesionParsed === "") {
                throw new Error(Errors.NO_SESSION_SAVED_ERROR);
            }

            return sesionParsed as GetSesionRes;
        }
        catch (error) {
            throw new Error(Errors.GET_SESSION_ERROR);
        }
    }

    public async saveSesion(dto: SaveSesionReq): Promise<void> {
        try {
            const sesionString = JSON.stringify(dto.sesion);
            localStorage.setItem("sesion", sesionString);
        }
        catch (error) {
            throw new Error(Errors.SAVE_SESSION_ERROR);
        }
    }

    public async deleteSesion(): Promise<void> {
        try {
            localStorage.removeItem("sesion");
        }
        catch (error) {
            throw new Error(Errors.DELETE_SESSION_ERROR);
        }
    }

}