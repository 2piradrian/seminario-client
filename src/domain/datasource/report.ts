import type { GetReportReq } from "../dto/report/request/GetReportReq";
import type { GetReportRes } from "../dto/report/response/GetReportRes";

export abstract class ReportDatasourceI {
    abstract getReport(dto: GetReportReq): Promise<GetReportRes>;
}