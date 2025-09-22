import type { AuthDataSourceI } from "../../domain/datasource/users";
import type { LoginUserReq } from "../../domain/dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../../domain/dto/auth/request/RegisterUserReq";
import type { GetUserByIdRes } from "../../domain/dto/auth/response/GetUserByIdRes";
import type { LoginUserRes } from "../../domain/dto/auth/response/LoginUserRes";
import type { GetUserByIdReq } from "../../domain/dto/user/GetUserById";
import type { AuthRepositoryI } from "../../domain/repository/auth";
import { AuthApiDataSource } from "../datasource/auth-api";

export class AuthRepository implements AuthRepositoryI {

    private dataSource: AuthDataSourceI;
    
    constructor(dataSource: AuthDataSourceI = new AuthApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async getById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async login(dto: LoginUserReq): Promise<LoginUserRes> {
        try {
            return await this.dataSource.login(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async register(dto: RegisterUserReq): Promise<void> {
        try {
            return await this.dataSource.register(dto);
        }
        catch (error) {
            throw error;
        }
    }
}