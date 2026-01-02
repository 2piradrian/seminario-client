import type { Session } from '../../../entity/session';

export interface ChangePasswordReq {
    session: Session;
    password: string;
}
