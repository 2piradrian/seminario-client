import type { Status } from "../../../entity/status";
import type { UserProfile } from "../../../entity/user-profile";

export interface GetUserByIdRes {
    id: string,
    email: string,
    status: Status,
    profile: UserProfile,
    role: string
}