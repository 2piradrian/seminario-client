import { HTTPClient } from "../../core";
import { ErrorHandler, type EditUserReq, type EditUserRes,
    type GetUserByIdReq, type GetUserByIdRes, type UserDataSourceI,
    type GetAllStaffReq, type GetAllStaffRes, type DeleteUserReq} from "../../domain";


export class UserProfileApiDataSource implements UserDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/users/get-by-id/${dto.userId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes> {
        try {
            const response = await this.httpClient.get("/api/users/get-all-staff", undefined, dto.session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async update(dto: EditUserReq): Promise<EditUserRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.put("/api/users", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error){
            throw error;
        }
    }

    public async delete(dto: DeleteUserReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/api/users", undefined, dto.session.getAccessToken()); // Note: controller has no body
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}