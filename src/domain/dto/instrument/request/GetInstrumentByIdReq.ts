import type { Session } from "../../../entity/session";

export interface GetInstrumentByIdReq {
    session: Session;
    id: string;
}