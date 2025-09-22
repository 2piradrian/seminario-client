import { HTTPClient } from "../../core/adapters/http-client";
import type { UserDataSourceI } from "../../domain/datasource/users";
import type { LoginUserReq } from "../../domain/dto/auth/request/LoginUserReq";
import type { RegisterUserReq } from "../../domain/dto/auth/request/RegisterUserReq";
import type { GetUserByIdRes } from "../../domain/dto/auth/response/GetUserByIdRes";
import type { LoginUserRes } from "../../domain/dto/auth/response/LoginUserRes";
import type { GetUserByIdReq } from "../../domain/dto/user/request/GetUserByIdReq";
import type { Sesion } from "../../domain/entity/sesion";

export class UserApiDataSource implements UserDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetUserByIdReq): Promise<GetUserByIdRes>{
        try {
            const response = await this.httpClient.get("/user/get-by-id", dto.userId);

            return response;
        }
        catch(error){
            throw error;
        }
    }

    public async login(dto: LoginUserReq): Promise<LoginUserRes> {
        try {
            const response = await this.httpClient.post("/user/login", { ...dto });

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
            const response = await this.httpClient.post("/user/register", { ...dto });

            if (!response) {
                throw new Error("No se ha podido registrar la cuenta");
            }
        }
        catch (error){
            throw error;
        }
    }



}