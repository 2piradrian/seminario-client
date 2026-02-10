import { HTTPClient } from "../../core";
import { ErrorHandler, type CreatePostTypeReq, type CreatePostTypeRes, type DeletePostTypeReq, type EditPostTypeReq, type EditPostTypeRes, type GetPostTypeByIdReq, type GetPostTypeByIdRes, type PostTypeDatasourceI } from "../../domain";

export class PostTypeApiDataSource implements PostTypeDatasourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreatePostTypeReq): Promise<CreatePostTypeRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/catalog/post-types", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetPostTypeByIdReq): Promise<GetPostTypeByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/catalog/post-types/get-by-id/${dto.id}`,undefined,dto.session.getAccessToken());


            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditPostTypeReq): Promise<EditPostTypeRes> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.put(`/api/catalog/post-types/${id}`, payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeletePostTypeReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(`/api/catalog/post-types/${dto.id}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}