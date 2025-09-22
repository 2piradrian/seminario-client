import { HTTPClient } from "../../core/adapters/http-client";
import type { AuthDataSourceI } from "../../domain/datasource/auth";
import type { LoginUserReq } from "../../domain/dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../../domain/dto/auth/request/RegisterUserReq";
import type { LoginUserRes } from "../../domain/dto/auth/response/LoginUserRes";
import type { Sesion } from "../../domain/entity/sesion";
import { ErrorHandler } from "../../domain/errors/error-handler";

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

            return response.sesion as Sesion;;
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

            if (!response) {
                throw new Error("No se ha podido registrar la cuenta");
            }
        }
        catch (error){
            throw error;
        }
    }



}