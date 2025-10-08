import type { PageType } from "../../../entity/page-type";
import type { Sesion } from "../../../entity/sesion";

export interface CreatePageReq {
    sesion: Sesion;
    name: string;
    pageType: PageType;
}
