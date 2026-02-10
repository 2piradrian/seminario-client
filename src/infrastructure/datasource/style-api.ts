import { HTTPClient } from "../../core";
import {
    ErrorHandler,
    StyleDatasourceI,
    type CreateStyleReq,
    type CreateStyleRes,
    type DeleteStyleReq,
    type EditStyleReq,
    type EditStyleRes,
    type GetStyleByIdReq,
    type GetStyleByIdRes
} from "../../domain";

export class StyleApiDataSource implements StyleDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreateStyleReq): Promise<CreateStyleRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post(
                "/api/catalog/styles",
                payload,
                session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetStyleByIdReq): Promise<GetStyleByIdRes> {
        try {
            const response = await this.httpClient.get(
                `/api/catalog/styles/get-by-id/${dto.id}`,
                undefined,
                dto.session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditStyleReq): Promise<EditStyleRes> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.put(
                `/api/catalog/styles/${id}`,
                payload,
                session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteStyleReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(
                `/api/catalog/styles/${dto.id}`,
                undefined,
                dto.session.getAccessToken()
            );

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
