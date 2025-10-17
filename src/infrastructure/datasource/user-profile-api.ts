import { HTTPClient } from "../../core";
import { ErrorHandler, type EditUserReq, type EditUserRes, type GetOwnProfileReq, type GetOwnProfileRes,
    type GetUserByIdReq, type GetUserByIdRes, type GetFollowerPageReq, type ToggleFollowReq, type GetFollowerPageRes,
    type UserProfileDataSourceI, type GetFollowingPageReq, type GetFollowingPageRes} from "../../domain";


export class UserProfileApiDataSource implements UserProfileDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            const response = await this.httpClient.get("/user-profiles/get-by-id", dto.userId, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes> {
        try {
            const response = await this.httpClient.get("/user-profiles/get-own-profile", {}, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async edit(dto: EditUserReq): Promise<EditUserRes> {
        try {
            const response = await this.httpClient.put("/user-profiles/edit", {...dto}, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error){
            throw error;
        }
    }

    public async toggleFollow(dto: ToggleFollowReq): Promise<void> {
        try {
            const response = await this.httpClient.post("/user-profiles/toggle-follow", {...dto}, dto.session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowers(dto: GetFollowerPageReq): Promise<GetFollowerPageRes> {
        try {
            const response = await this.httpClient.post("/user-profiles/get-followers", {...dto});

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowing(dto: GetFollowingPageReq): Promise<GetFollowingPageRes> {
        try {
            const response = await this.httpClient.post("/user-profiles/get-following", {...dto});

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw error;
        }
    }
}