import type { Session } from '../../../entity/session';

export interface ToggleAssistReq {
    session: Session;
    eventId: string;
}