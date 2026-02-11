import type { BannedUser } from "../../../entity/banned-user";

export interface GetAllBannedUsersRes {
    bannedUsers: BannedUser[];
    nextPage: number;
}