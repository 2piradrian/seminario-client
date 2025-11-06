import { Session } from "../../../entity/session.ts";

export interface CreateEventReq {
    session: Session;
    title: string;
    content: string;
    profileId: string;
    dateInit: Date;
    dateEnd: Date;
}