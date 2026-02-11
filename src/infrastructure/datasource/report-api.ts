import { HTTPClient } from "../../core";
import { ErrorHandler, type GetReportReq, type GetReportRes, type ReportDatasourceI } from "../../domain";

export class ReportApiDataSource implements ReportDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async getReport(dto: GetReportReq): Promise<GetReportRes> {
        try {
            const { session } = dto;
            const response = await this.httpClient.post("/api/reports/get-report", undefined, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}