import type { AuthUserReq } from "../dto/auth/request/AuthUserReq";
import type { LoginUserReq } from "../dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../dto/auth/request/RegisterUserReq";
import type { AuthUserRes } from "../dto/auth/response/AuthUserRes";
import type { LoginUserRes } from "../dto/auth/response/LoginUserRes";
import type { DeleteUserReq } from "../dto/auth/request/DeleteUserReq";
import type { GrantRoleUserReq } from "../dto/auth/request/GrantRoleUserReq";
import type { RevokeRoleUserReq } from "../dto/auth/request/RevokeRoleUserReq";
import type { GetAllStaffReq } from "../dto/auth/request/GetAllStaffReq";
import type { GetAllStaffRes } from "../dto/auth/response/GetAllStaffRes";

export abstract class AuthDataSourceI {
    abstract auth(dto: AuthUserReq): Promise<AuthUserRes>;
    abstract login(dto: LoginUserReq): Promise<LoginUserRes>;
    abstract register(dto: RegisterUserReq): Promise<void>;
    abstract delete(dto: DeleteUserReq): Promise<void>;
    abstract grantRole(dto: GrantRoleUserReq): Promise<void>;
    abstract revokeRole(dto: RevokeRoleUserReq): Promise<void>;
    abstract getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes>
}
