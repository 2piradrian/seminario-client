import type { Session } from "../../../entity/session.ts";

export interface GetSearchResultFilteredReq {
    page: number;
    size: number;
    text?: string;
    styles?: string[];
    instruments?: string[];
    pageTypeId?: string;
    postTypeId?: string;
    contentTypeId: string;
    dateInit?: Date;
    dateEnd?: Date;
    session: Session
}
