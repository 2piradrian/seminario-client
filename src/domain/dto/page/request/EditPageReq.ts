import type { PageType } from "../../../entity/page-type";
import type { Session } from "../../../entity/session.ts";

export interface EditPageReq {
    session: Session;
    pageId: string;
    name: string;
    portraitImage: string;
    profileImage: string;
    shortDescription: string;
    longDescription: string;
    members: string[];
    pageType: PageType;
}
