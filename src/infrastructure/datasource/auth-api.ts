import { HTTPClient } from "../../core";
import { ErrorHandler, type AuthDataSourceI, type LoginUserReq, type LoginUserRes, type RegisterUserReq, type Sesion } from "../../domain";

export class AuthApiDataSource implements AuthDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async login(dto: LoginUserReq): Promise<LoginUserRes> {
        try {
            const response = await this.httpClient.post("/auth/login", { ...dto });

            if (!response.sesion) {
                throw new Error("No se ha podido iniciar sesión");
            }

            return response.sesion as Sesion;
        }
        catch (error) {
            throw error;
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
            throw error;
        }
    }



}