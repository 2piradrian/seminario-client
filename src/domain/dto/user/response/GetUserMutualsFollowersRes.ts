import type { User } from "../../../entity/user";

export interface GetUserMutualsFollowersRes {
    mutualFollowers: User[];
}
