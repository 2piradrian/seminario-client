import type { TimeReportContent } from "../../../entity/time-report-content";

export interface GetReportRes {
    users: TimeReportContent;
    posts: TimeReportContent;
    pages: TimeReportContent;
    events: TimeReportContent;
}