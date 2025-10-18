import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";

export interface GetSearchResultFilteredReq {
    page: Number;
    size: Number;
    name: String;
    styles: Style[];
    instruments: Instrument[];
    ids: String[]
    pageTypeId: String;
}
