import { HTTPClient } from "../../core";
import { type CreatePageReq, type EditPageReq, type DeletePageReq, type GetPageByIdReq, type GetPageByUserIdReq, type GetPageByIdRes, type GetPageByUserIdRes, ErrorHandler, type Error, type PageProfileDatasourceI, type CreatePageRes, type LeavePageReq, type JoinPageReq } from "../../domain";

export class PageProfileApiDataSource implements PageProfileDatasourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreatePageReq): Promise<CreatePageRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/page-profiles", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetPageByIdReq): Promise<GetPageByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/page-profiles/get-by-id/${dto.pageId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getByUserId(dto: GetPageByUserIdReq): Promise<GetPageByUserIdRes> {
        try {
            const response = await this.httpClient.get(`/api/page-profiles/get-by-user-id/${dto.userId}`, undefined, dto.session.getAccessToken());

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
            const { session, pageId, ...payload } = dto;
            const response = await this.httpClient.put(`/api/page-profiles/${pageId}`, payload, session.getAccessToken());

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
            const response = await this.httpClient.delete(`/api/page-profiles/${dto.pageId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async leave(dto: LeavePageReq): Promise<void> {
        try {
            const response = await this.httpClient.patch(`/api/page-profiles/leave/${dto.pageId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async joinPage(dto: JoinPageReq): Promise<void> {
        try {
            const { session, pageId } = dto;
            const response = await this.httpClient.patch(`/api/page-profiles/join/${pageId}`, undefined, session.getAccessToken());

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
