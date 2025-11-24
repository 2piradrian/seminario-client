import type { Session } from "../../../entity/session.ts";

export interface CreatePageReq {
    session: Session;
    name: string;
    pageTypeId: string;
}
