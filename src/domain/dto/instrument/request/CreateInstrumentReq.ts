import type { Session } from "../../../entity/session";

export interface CreateInstrumentReq {
    session: Session;
    name: string;
}