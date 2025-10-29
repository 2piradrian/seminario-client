import { HTTPClient } from "../../core";
import { ErrorHandler, type EditUserReq, type EditUserRes,
    type GetUserByIdReq, type GetUserByIdRes,
    type UserProfileDataSourceI} from "../../domain";


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
}