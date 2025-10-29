import type { UserProfile } from "../../../entity/user-profile";

export interface GetAllStaffRes {
    staff: Map<string, UserProfile[]>;
}
