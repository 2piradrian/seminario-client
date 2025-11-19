import type { AuthUserReq } from "../dto/auth/request/AuthUserReq";
import type { LoginUserReq } from "../dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../dto/auth/request/RegisterUserReq";
import type { AuthUserRes } from "../dto/auth/response/AuthUserRes";
import type { LoginUserRes } from "../dto/auth/response/LoginUserRes";

export abstract class AuthRepositoryI {
    abstract auth(dto: AuthUserReq): Promise<AuthUserRes>;
    abstract login(dto: LoginUserReq): Promise<LoginUserRes>;
    abstract register(dto: RegisterUserReq): Promise<void>;
}
