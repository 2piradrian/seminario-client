import type { Role } from "../../../entity/role";
import type { Status } from "../../../entity/status";

export interface AuthUserRes {
    id: string;
    email: string;
    role: Role;
    status: Status
}