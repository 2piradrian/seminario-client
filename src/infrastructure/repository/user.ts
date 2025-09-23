import type { DeleteUserReq, EditUserReq, EditUserRes, GetOwnProfileReq, GetOwnProfileRes, GetUserByIdReq, GetUserByIdRes, UserDataSourceI, UserRepositoryI } from "../../domain";
import { UserApiDataSource } from "../datasource/user-api";

export class UserRepository implements UserRepositoryI {

    private dataSource: UserDataSourceI;

    constructor(dataSource: UserDataSourceI = new UserApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes> {
        try {
            return await this.dataSource.getOwnProfile(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            return await this.dataSource.getUserById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async editUser(dto: EditUserReq): Promise<EditUserRes> {
        try { 
            return await this.dataSource.editUser(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteUser(dto: DeleteUserReq): Promise<void> {
        try {
            return await this.dataSource.deleteUser(dto);
        }
        catch (error) {
            throw error;
        }
    }

}