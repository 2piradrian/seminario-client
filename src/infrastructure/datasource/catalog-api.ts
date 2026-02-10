import { HTTPClient } from "../../core";
import { CatalogDataSourceI, ErrorHandler, type GetAllInstrumentRes, type GetAllStyleRes, type GetAllCategoryRes, type GetAllPageTypeRes, type GetAllPostTypeRes } from "../../domain";
import type { GetAllContentTypeRes } from "../../domain/dto/catalog/response/GetAllContentTypeRes";
import type { GetContentTypeByIdReq } from "../../domain/dto/catalog/request/GetContentTypeByIdReq";
import type { GetContentTypeByIdRes } from "../../domain/dto/catalog/response/GetContentTypeByIdRes";
import type { GetAllModerationReasonRes } from "../../domain/dto/catalog/response/GetAllModerationReasonRes";

export class CatalogApiDataSource implements CatalogDataSourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async getAllStyle(): Promise<GetAllStyleRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/styles/get-all");

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllInstrument(): Promise<GetAllInstrumentRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/instruments/get-all");

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllPageType(): Promise<GetAllPageTypeRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/page-types/get-all");

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllCategory(): Promise<GetAllCategoryRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/categories/get-all");

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllContentType(): Promise<GetAllContentTypeRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/content-types/get-all");

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllPostType(): Promise<GetAllPostTypeRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/post-types/get-all");
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getContentTypeById(dto: GetContentTypeByIdReq): Promise<GetContentTypeByIdRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/content-types/get-by-id/", dto.contentTypeId);   

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllModerationReason(): Promise<GetAllModerationReasonRes> {
        try {
            const response = await this.httpClient.get("/api/catalog/moderation-reasons/get-all");
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