import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";
import type { Session } from "../../../entity/session.ts";

export interface GetSearchResultFilteredReq {
    page: Number;
    size: Number;
    name: String;
    styles: Style[];
    instruments: Instrument[];
    ids: String[]
    pageTypeId: String;
    contentTypeId: String;
    session: Session
}
