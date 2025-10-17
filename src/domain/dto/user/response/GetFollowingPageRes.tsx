import type { Profile } from "../../../entity/profile";

export interface GetFollowingPageRes {
    following: Profile[];
    nextPage: number;
}