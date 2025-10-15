import type { Session } from "../../../entity/session.ts";

export interface DeletePageReq{
    session: Session;
    pageId: string;
}
