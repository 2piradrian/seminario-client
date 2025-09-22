import type { UserDataSourceI } from "../../domain/datasource/users";
import type { LoginUserReq } from "../../domain/dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../../domain/dto/auth/request/RegisterUserReq";
import type { GetUserByIdRes } from "../../domain/dto/auth/response/GetUserByIdRes";
import type { LoginUserRes } from "../../domain/dto/auth/response/LoginUserRes";
import type { GetUserByIdReq } from "../../domain/dto/user/request/GetUserByIdReq";
import type { UserRepositoryI } from "../../domain/repository/users";
import { UserApiDataSource } from "../datasource/user-api";

export class UserRepository implements UserRepositoryI {

    private dataSource: UserDataSourceI;
    
    constructor(dataSource: UserDataSourceI = new UserApiDataSource()) {
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