import type { PageType } from "../../../entity/page-type";
import type { Sesion } from "../../../entity/sesion";

export interface EditPageReq {
    sesion: Sesion;
    pageId: string;
    name: string;
    portraitImage: string;
    profileImage: string;
    shortDescription: string;
    longDescription: string;
    ownerId: string;
    members: string[];
    pageType: PageType
}
