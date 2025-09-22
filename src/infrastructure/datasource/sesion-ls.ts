import type { SesionDataSourceI } from "../../domain/datasource/sesion";
import type { Sesion } from "../../domain/entity/sesion";

export class SesionLSDataSourceI implements SesionDataSourceI {

    public async getSesion(): Promise<Sesion> {
        try {
            const sesion = localStorage.getItem("sesion");
            const sesionParsed = JSON.parse(sesion || "");

            if (!sesionParsed || sesionParsed === "") {
                throw new Error("No hay sesión guardada");
            }

            return sesionParsed as Sesion;
        }
        catch (error) {
            throw new Error("Error obteniendo sesión");
        }
    }

    public async saveSesion(sesion: Sesion): Promise<void> {
        try {
            const sesionString = JSON.stringify(sesion);
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