import type { Session } from "../../../entity/session";

export interface EditInstrumentReq {
    session: Session;
    id: string;
    name: string;
}