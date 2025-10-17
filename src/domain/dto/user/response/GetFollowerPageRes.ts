import type { Profile } from "../../../entity/profile";

export interface GetFollowerPageRes {
    followers: Profile[];
    nextPage: number;
}