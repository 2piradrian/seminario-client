import type { UserDataSourceI } from "../../domain/datasource/user";
import type { DeleteUserReq } from "../../domain/dto/user/request/DeleteUserReq";
import type { EditUserReq } from "../../domain/dto/user/request/EditUserReq";
import type { GetUserByIdReq } from "../../domain/dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../../domain/dto/user/response/EditUserRes";
import type { GetUserByIdRes } from "../../domain/dto/user/response/GetUserByIdRes";
import type { UserRepositoryI } from "../../domain/repository/user";
import { UserApiDataSource } from "../datasource/user-api";

export class UserRepository implements UserRepositoryI {

    private dataSource: UserDataSourceI;

    constructor(dataSource: UserRepositoryI = new UserApiDataSource()) {
        this.dataSource = dataSource;
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