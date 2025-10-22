import type { SaveSessionReq } from "../dto/session/request/SaveSessionReq";
import type { GetSessionRes } from "../dto/session/response/GetSessionRes";

export abstract class SessionDataSourceI {
    abstract getSession(): Promise<GetSessionRes>;
    abstract saveSession(dto: SaveSessionReq): Promise<void>;
    abstract deleteSession(): Promise<void>;
}