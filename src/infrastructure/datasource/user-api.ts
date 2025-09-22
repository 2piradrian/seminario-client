import { HTTPClient } from "../../core/adapters/http-client";
import type { UserDataSourceI } from "../../domain/datasource/user";
import type { DeleteUserReq } from "../../domain/dto/user/request/DeleteUserReq";
import type { EditUserReq } from "../../domain/dto/user/request/EditUserReq";
import type { GetUserByIdReq } from "../../domain/dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../../domain/dto/user/response/EditUserRes";
import type { GetUserByIdRes } from "../../domain/dto/user/response/GetUserByIdRes";

export class UserApiDataSource implements UserDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            const response = await this.httpClient.get("/users/get-by-id", dto.userId);

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async editUser(dto: EditUserReq): Promise<EditUserRes> {
        try {
            const response = await this.httpClient.put("/users/edit", {...dto}, dto.token)

            return response;
        }
        catch (error){
            throw error;
        }
    }

    public async deleteUser(dto: DeleteUserReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/users/delete", {} ,dto.token)

            return response;
        }
        catch (error){
            throw error;
        }
    }
}