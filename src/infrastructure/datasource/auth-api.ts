import { HTTPClient } from "../../core";
import { ErrorHandler, type AuthDataSourceI, type AuthUserReq, type AuthUserRes, type DeleteUserReq, type GetAllStaffReq, type GetAllStaffRes, type GrantRoleUserReq, type LoginUserReq, type LoginUserRes, type RegisterUserReq, type RevokeRoleUserReq } from "../../domain";
import { Errors } from "../../domain";  

export class AuthApiDataSource implements AuthDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async auth(dto: AuthUserReq): Promise<AuthUserRes> {
        try {
            const response = await this.httpClient.get("/auth/", {}, dto.session.getAccessToken());
            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async login(dto: LoginUserReq): Promise<LoginUserRes> {
        try {
            const response = await this.httpClient.post("/auth/login", { ...dto });

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            const token = response.token;
            if (!token) {
                throw new Error(Errors.LOGIN_ERROR_MESSAGE);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async register(dto: RegisterUserReq): Promise<void>{
        try {
            const response = await this.httpClient.post("/auth/register", { ...dto });

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteUserReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/users/delete", {}, dto.session.getAccessToken())

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error){
            throw error;
        }
    }

    public async grantRole(dto: GrantRoleUserReq): Promise<void> {
        try {
            const response = await this.httpClient.post("/auth/grant-role", { ...dto }, dto.session.getAccessToken())

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error){
            throw error;
        }
    }


    public async revokeRole(dto: RevokeRoleUserReq): Promise<void> {
        try {
            const response = await this.httpClient.post("/auth/revoke-role", { ...dto }, dto.session.getAccessToken())

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error){
            throw error;
        }
    }

    public async getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes> {
        try {
            const response = await this.httpClient.get("/users/get-all-staff", {}, dto.session.getAccessToken())

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error){
            throw error;
        }
    }
}
