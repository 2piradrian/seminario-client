import type { AuthDataSourceI, AuthRepositoryI, LoginUserReq, LoginUserRes, RegisterUserReq } from "../../domain";
import { AuthApiDataSource } from "../datasource/auth-api";

export class AuthRepository implements AuthRepositoryI {

    private dataSource: AuthDataSourceI;
    
    constructor(dataSource: AuthDataSourceI = new AuthApiDataSource()) {
        this.dataSource = dataSource;
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