import type { Instrument } from "../../../entity/instrument";
import type { Sesion } from "../../../entity/sesion";
import type { Style } from "../../../entity/style";

export interface EditUserReq {
    sesion: Sesion;
    name: string;
    surname: string;
    portraitImage?: string;
    profileImage?: string;
    shortDescription: string;
    longDescription: string;
    styles: Style[];
    instruments: Instrument[];
}
