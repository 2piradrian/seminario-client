import type { Session } from "../../../entity/session.ts";

export interface GetPageByIdReq {
    session: Session;
    pageId: string;    
}
