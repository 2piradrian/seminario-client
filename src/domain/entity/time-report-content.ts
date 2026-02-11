export class TimeReportContent {

    constructor(
        public yearlyReport: string, 
        public monthlyReport: string,
        public weeklyReport: string
    ){}

    public static fromObject(object: {[key: string]: any}): TimeReportContent {
        if (!object) return null;

        return new TimeReportContent(
            object.yearlyReport, 
            object.monthlyReport,
            object.weeklyReport        
        )
    };
    
}