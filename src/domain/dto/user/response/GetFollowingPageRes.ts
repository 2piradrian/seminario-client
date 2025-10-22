import type { UserProfile } from "../../../entity/user-profile";

export interface GetFollowingPageRes {
    following: UserProfile[];
    nextPage: number;
}