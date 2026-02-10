import { HTTPClient } from "../../core";
import { ErrorHandler, type BanUserReq, type BannedUserDataSourceI } from "../../domain";

export class BannedUserApiDataSource implements BannedUserDataSourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async ban(dto: BanUserReq): Promise<void> {
        try {
            const { session, userId, reasonId } = dto;
            const query = new URLSearchParams({ userId, reasonId }).toString();
            const response = await this.httpClient.post(`/users/api/banned/ban-user?${query}`, undefined, session.getAccessToken());

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
