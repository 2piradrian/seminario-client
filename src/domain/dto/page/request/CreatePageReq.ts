import type { PageType } from "../../../entity/page-type";
import type { Session } from "../../../entity/session.ts";

export interface CreatePageReq {
    session: Session;
    name: string;
    pageType: PageType;
}
