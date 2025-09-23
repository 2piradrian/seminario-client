import type { GetSesionRes, SaveSesionReq, SesionDataSourceI, SesionRepositoryI } from "../../domain";
import { SesionLSDataSourceI } from "../datasource/sesion-ls";

export class SesionRepository implements SesionRepositoryI {

    private dataSource: SesionDataSourceI;

    constructor(dataSource: SesionRepositoryI = new SesionLSDataSourceI()) {
        this.dataSource = dataSource;
    }

    public async getSesion(): Promise<GetSesionRes> {
        try {
            return await this.dataSource.getSesion();
        }
        catch (error) {
            throw error;
        }
    }
    public async saveSesion(dto: SaveSesionReq): Promise<void> {
        try {
            return await this.dataSource.saveSesion(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteSesion(): Promise<void> {
        try {
            return await this.dataSource.deleteSesion();
        }
        catch (error) {
            throw error;
        }
    }
}