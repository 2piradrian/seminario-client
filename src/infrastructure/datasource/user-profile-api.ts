import { HTTPClient } from "../../core";
import type { EditUserReq, EditUserRes, GetOwnProfileReq, GetOwnProfileRes, GetUserByIdReq, GetUserByIdRes, UserProfileDataSourceI } from "../../domain";

export class UserProfileApiDataSource implements UserProfileDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            const response = await this.httpClient.get("/profiles/get-by-id", dto.userId);

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes> {
        try {
            const response = await this.httpClient.get("/profiles/get-own-profile", {}, dto.sesion.getAccessToken());
            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async edit(dto: EditUserReq): Promise<EditUserRes> {
        try {
            const response = await this.httpClient.put("/profiles/edit", {...dto}, dto.sesion.getAccessToken())

            return response;
        }
        catch (error){
            throw error;
        }
    }

}