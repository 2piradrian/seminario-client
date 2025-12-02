import type { Session } from "../../../entity/session";

export interface GetConversationPageReq {
    session: Session;
    page: number;
    size: number;
    user1Id: string;
    user2Id: string;
}
