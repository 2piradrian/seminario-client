import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";
import type { Session } from "../../../entity/session.ts";

export interface GetSearchResultFilteredReq {
    page: number;
    size: number;
    name: string;
    styles: Style[];
    instruments: Instrument[];
    pageTypeId: string;
    contentTypeId: string;
    session: Session
}
