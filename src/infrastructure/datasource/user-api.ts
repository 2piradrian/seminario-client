import { HTTPClient } from "../../core";
import type { DeleteUserReq, EditUserReq, EditUserRes, GetOwnProfileReq, GetOwnProfileRes, GetUserByIdReq, GetUserByIdRes, UserDataSourceI } from "../../domain";

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

    public async getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes> {
        try {
            const response = await this.httpClient.get("/users/get-own-profile", {}, dto.token);
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