import { HTTPClient } from "../../core";
import { type CreatePageReq, type EditPageReq, type DeletePageReq, type GetPageByIdReq, type GetPageByUserIdReq, type GetPageByIdRes, type GetPageByUserIdRes, ErrorHandler, type Error, type PageDatasourceI, type CreatePageRes } from "../../domain";

export class PageApiDataSource implements PageDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetPageByIdReq): Promise<GetPageByIdRes> {
        try {
            const response = await this.httpClient.get("/pages/get-by-id", dto.pageId);

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            
            return response;
        } 
        catch (error) {
            console.log(error)
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getByUserId(dto: GetPageByUserIdReq): Promise<GetPageByUserIdRes> {
        try {
            const response = await this.httpClient.get("/pages/get-by-user-id", dto.userId);
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async create(dto: CreatePageReq): Promise<CreatePageRes> {
        try {
            const response = await this.httpClient.post("/pages/create", { ...dto }, dto.sesion.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditPageReq): Promise<void> {
        try {
            const response = await this.httpClient.put("/pages/edit", { ...dto }, dto.sesion.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    } 

    public async delete(dto: DeletePageReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/pages/delete", { ...dto }, dto.sesion.getAccessToken());
            
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
