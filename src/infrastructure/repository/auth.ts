import type { AuthDataSourceI, AuthRepositoryI, AuthUserReq, AuthUserRes, DeleteUserReq, GetAllStaffReq, GetAllStaffRes, GrantRoleUserReq, LoginUserReq, LoginUserRes, RegisterUserReq, RevokeRoleUserReq } from "../../domain";
import { AuthApiDataSource } from "../datasource/auth-api";

export class AuthRepository implements AuthRepositoryI {

    private dataSource: AuthDataSourceI;
    
    constructor(dataSource: AuthDataSourceI = new AuthApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async auth(dto: AuthUserReq): Promise<AuthUserRes> {
        try {
            return await this.dataSource.auth(dto);
        }
        catch (error) {
            throw error;
        }
    };

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

    public async delete(dto: DeleteUserReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async grantRole(dto: GrantRoleUserReq): Promise<void> {
        try {
            return await this.dataSource.grantRole(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async revokeRole(dto: RevokeRoleUserReq): Promise<void> {
        try {
            return await this.dataSource.revokeRole(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes> {
        try {
            return await this.dataSource.getAllStaff(dto);
        }
        catch (error) {
            throw error;
        }
    }
}
