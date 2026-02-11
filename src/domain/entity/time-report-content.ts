export class TimeReportContent {

    constructor(
        public yearlyReport: number, 
        public monthlyReport: number,
        public weeklyReport: number
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