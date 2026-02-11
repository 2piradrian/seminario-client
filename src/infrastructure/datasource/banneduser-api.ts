import { HTTPClient } from "../../core";
import { ErrorHandler, type BanUserReq, type BannedUserDataSourceI, type GetAllBannedUsersReq, type GetAllBannedUsersRes } from "../../domain";

export class BannedUserApiDataSource implements BannedUserDataSourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async ban(dto: BanUserReq): Promise<void> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/banned/ban-user", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllBannedUsers(dto: GetAllBannedUsersReq): Promise<GetAllBannedUsersRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.get("/api/banned/get-all-banned-user-page", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
