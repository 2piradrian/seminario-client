import type { GetSessionRes, SaveSessionReq, SessionDataSourceI, SessionRepositoryI } from "../../domain";
import { SessionLSDataSourceI } from "../datasource/session-ls";

export class SessionRepository implements SessionRepositoryI {

    private dataSource: SessionDataSourceI;

    constructor(dataSource: SessionRepositoryI = new SessionLSDataSourceI()) {
        this.dataSource = dataSource;
    }

    public async getSession(): Promise<GetSessionRes> {
        try {
            return await this.dataSource.getSession();
        }
        catch (error) {
            throw error;
        }
    }
    public async saveSession(dto: SaveSessionReq): Promise<void> {
        try {
            return await this.dataSource.saveSession(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteSession(): Promise<void> {
        try {
            return await this.dataSource.deleteSession();
        }
        catch (error) {
            throw error;
        }
    }
}