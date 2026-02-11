import type { GetReportReq } from "../dto/report/request/GetReportReq";
import type { GetReportRes } from "../dto/report/response/GetReportRes";

export abstract class ReportRepositoryI {
    abstract getReport(dto: GetReportReq): Promise<GetReportRes>;
}