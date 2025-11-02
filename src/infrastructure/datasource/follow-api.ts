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
            const response = await this.httpClient.post("/follows/toggle-follow", {...dto}, dto.session.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowerPage(dto: GetFollowerPageReq): Promise<GetFollowerPageRes> {
        try {
            const response = await this.httpClient.post("/follows/get-followers", {...dto}, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowingPage(dto: GetFollowingPageReq): Promise<GetFollowingPageRes> {
        try {
            const response = await this.httpClient.post("/follows/get-following", {...dto}, dto.session.getAccessToken());

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
