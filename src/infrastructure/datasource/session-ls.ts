import {Session} from '../../domain';
import type {GetSessionRes, SaveSessionReq, SessionDataSourceI} from "../../domain";
import {Errors} from "../../domain";

export class SessionLSDataSourceI implements SessionDataSourceI {

    public async getSession(): Promise<GetSessionRes> {
        try {
            const session = localStorage.getItem("session");
            const sessionParsed = JSON.parse(session || "");

            if (!sessionParsed || sessionParsed === "") {
                throw new Error(Errors.NO_SESSION_SAVED_ERROR);
            }

            return {
                session: Session.fromObject(sessionParsed),
            };
        }
        catch (error) {
            throw new Error(Errors.GET_SESSION_ERROR);
        }
    }

    public async saveSession(dto: SaveSessionReq): Promise<void> {
        try {
            const sessionString = JSON.stringify(dto.session);
            localStorage.setItem("session", sessionString);
        }
        catch (error) {
            throw new Error(Errors.SAVE_SESSION_ERROR);
        }
    }

    public async deleteSession(): Promise<void> {
        try {
            localStorage.removeItem("session");
        }
        catch (error) {
            throw new Error(Errors.DELETE_SESSION_ERROR);
        }
    }

}