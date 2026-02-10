import type { Session } from "../../../entity/session";

export interface DeleteInstrumentReq {
    session: Session;
    id: string;
}