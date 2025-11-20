import { HTTPClient } from "../../core";
import { ErrorHandler, type GetFollowerPageReq, type ToggleFollowReq, type GetFollowerPageRes,
    type GetFollowingPageReq,
    type GetFollowingPageRes,
    type FollowDatasourceI} from "../../domain";


export class FollowApiDataSource implements FollowDatasourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async toggleFollow(dto: ToggleFollowReq): Promise<void> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/follows/toggle-follow", payload, session.getAccessToken());
            
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
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/follows/get-followers", params, session.getAccessToken());

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
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/follows/get-following", params, session.getAccessToken());

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
