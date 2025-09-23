import type { Instrument } from "../../../entity/instrument";
import type { Style } from "../../../entity/style";

export interface EditUserReq {
    token: string;
    name: string;
    surname: string;
    portraitImage?: string;
    profileImage?: string;
    shortDescription: string;
    longDescription: string;
    styles: Style[];
    instruments: Instrument[];
}
