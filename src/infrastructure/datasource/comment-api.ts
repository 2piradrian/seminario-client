import { HTTPClient } from "../../core";
import { type CreateCommentReq, type CreateCommentRes, type DeleteCommentReq, type GetCommentPageReq, type GetCommentPageRes, type ToggleCommentVotesReq, ErrorHandler, type Error, type CommentDatasourceI, type ToggleCommentVoteRes } from "../../domain";

export class CommentApiDataSource implements CommentDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getCommentPage(dto: GetCommentPageReq): Promise<GetCommentPageRes> {
        try {
            const response = await this.httpClient.post("/comments/get-comments", { ...dto });

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async create(dto: CreateCommentReq): Promise<CreateCommentRes> {
        try {
            const response = await this.httpClient.post("/comments/create", { ...dto }, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response; 
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async delete(dto: DeleteCommentReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/comments/delete", { ...dto }, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async toggleVotes(dto: ToggleCommentVotesReq): Promise<ToggleCommentVoteRes> {
        try {
            const response = await this.httpClient.put("/comments/toggle-votes", { ...dto }, dto.session.getAccessToken());

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
