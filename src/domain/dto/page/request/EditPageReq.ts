import type { Session } from "../../../entity/session.ts";

export interface EditPageReq {
    session: Session;
    pageId: string;
    name: string;
    portraitImage: string;
    profileImage: string;
    shortDescription: string;
    longDescription: string;
    ownerId: string; // TODO: Cambiar la comprobacion del backend
    members: string[];
    pageTypeId: string;
}
