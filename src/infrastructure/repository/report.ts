import type { GetReportReq, GetReportRes, ReportDatasourceI, ReportRepositoryI } from "../../domain";
import { ReportApiDataSource } from "../datasource/report-api";

export class ReportRepository implements ReportRepositoryI {
    
    private dataSource: ReportDatasourceI;

    constructor(datasource: ReportDatasourceI = new ReportApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getReport(dto: GetReportReq): Promise<GetReportRes> {
        try {
            return await this.dataSource.getReport(dto);
        }
        catch (error) {
            throw error;
        }
    }
    
}