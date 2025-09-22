import type { LoginUserReq } from "../dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../dto/auth/request/RegisterUserReq";
import type { LoginUserRes } from "../dto/auth/response/LoginUserRes";

export abstract class AuthRepositoryI {
    abstract register(dto: RegisterUserReq): Promise<void>;
    abstract login(dto: LoginUserReq): Promise<LoginUserRes>;
}