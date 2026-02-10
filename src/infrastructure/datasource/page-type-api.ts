import { HTTPClient } from "../../core";
import { ErrorHandler, PageTypeDatasourceI, type CreatePageTypeReq, type CreatePageTypeRes, type CreatePostTypeReq, type CreatePostTypeRes, type DeletePageTypeReq, type DeletePostTypeReq, type EditPageTypeReq, type EditPageTypeRes, type EditPostTypeReq, type EditPostTypeRes, type GetPageTypeByIdReq, type GetPageTypeByIdRes, type GetPostTypeByIdReq, type GetPostTypeByIdRes, type PostTypeDatasourceI } from "../../domain";

export class PageTypeApiDataSource implements PageTypeDatasourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreatePageTypeReq): Promise<CreatePageTypeRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/catalog/page-types", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetPageTypeByIdReq): Promise<GetPageTypeByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/catalog/page-types/get-by-id/${dto.id}`,undefined,dto.session.getAccessToken());


            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditPageTypeReq): Promise<EditPageTypeRes> {
        try {
            const { session, id, ...payload } = dto;
            const response = await this.httpClient.put(`/api/catalog/page-types/${id}`, payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeletePageTypeReq): Promise<void> {
        try {
            const response = await this.httpClient.delete(`/api/catalog/page-types/${dto.id}`, undefined, dto.session.getAccessToken());

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