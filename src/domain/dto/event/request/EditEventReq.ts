import { Session } from "../../../entity/session.ts";

export interface EditEventReq {
    session: Session;
    eventId: string;
    title: string;
    content: string; 
    base64Image: string;
    dateInit: Date;
    dateEnd: Date;
}