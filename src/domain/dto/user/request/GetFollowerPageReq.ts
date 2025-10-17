import type { UserProfile } from "../../../entity/user-profile";

export interface GetFollowerPageReq {
    userId: string;
    page: number;
    size: number;
}