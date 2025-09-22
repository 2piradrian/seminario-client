import type { LoginUserReq } from "../dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../dto/auth/request/RegisterUserReq";
import type { GetUserByIdRes } from "../dto/auth/response/GetUserByIdRes";
import type { LoginUserRes } from "../dto/auth/response/LoginUserRes";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";

export abstract class AuthDataSourceI {
    abstract getById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
    abstract register(dto: RegisterUserReq): Promise<void>;
    abstract login(dto: LoginUserReq): Promise<LoginUserRes>;
}