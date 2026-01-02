import type { User } from "../../../entity/user";

export interface GetAssistantsByEventIdRes {
    assistants: User[];
    nextPage: number;
}