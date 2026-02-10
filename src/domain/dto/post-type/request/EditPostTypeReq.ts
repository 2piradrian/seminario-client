import type { Session } from "../../../entity/session";

export interface EditPostTypeReq {
    session: Session;
    id: string;
    name: string;
}