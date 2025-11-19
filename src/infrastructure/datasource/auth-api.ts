import { HTTPClient } from "../../core";
import { ErrorHandler, type AuthDataSourceI, type AuthUserReq, type AuthUserRes, type LoginUserReq, type LoginUserRes, type RegisterUserReq } from "../../domain";
import { Errors } from "../../domain";  

export class AuthApiDataSource implements AuthDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async auth(dto: AuthUserReq): Promise<AuthUserRes> {
        try {
            const response = await this.httpClient.get("/api/auth/", {}, dto.session.getAccessToken());
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
            const response = await this.httpClient.post("/api/auth/login", { ...dto });

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
            const response = await this.httpClient.post("/api/auth/register", { ...dto });

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error);
        }
    }

}
