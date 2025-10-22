import type { UserProfile } from "../../../entity/user-profile";

export interface GetFollowerPageRes {
    followers: UserProfile[];
    nextPage: number;
}