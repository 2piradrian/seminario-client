import { HTTPClient } from "../../core";
import { type CreateCommentReq, type CreateCommentRes, type DeleteCommentReq, type GetCommentPageReq, type GetCommentPageRes, type ToggleCommentVotesReq, ErrorHandler, type Error, type CommentDatasourceI, type ToggleCommentVoteRes, type GetCommentByIdReq, type GetCommentByIdRes } from "../../domain";

export class CommentApiDataSource implements CommentDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreateCommentReq): Promise<CreateCommentRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/comments", payload, session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetCommentByIdReq): Promise<GetCommentByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/comments/get-by-id/${dto.commentId}`, undefined, dto.session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getComments(dto: GetCommentPageReq): Promise<GetCommentPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/comments/get-comments", params, session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async toggleVotes(dto: ToggleCommentVotesReq): Promise<ToggleCommentVoteRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.put("/api/comments/toggle-votes", payload, session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteCommentReq): Promise<void> {
        try {
            console.log(dto)
            const { session, commentId, ...payload } = dto;
            const response = await this.httpClient.delete(`/api/comments/${commentId}`, payload, session.getAccessToken());
            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }
            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
}
