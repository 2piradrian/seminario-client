import { HTTPClient } from "../../core";
import { type GetPostByIdRes, type GetPostByIdReq, type CreatePostReq, type CreatePostRes, type EditPostReq, type EditPostRes, type DeletePostReq, type GetPostPageReq, type GetPostPageRes, type TogglePostVotesReq, ErrorHandler, type Error, type PostDatasourceI } from "../../domain";

export class PostApiDataSource implements PostDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetPostByIdReq): Promise<GetPostByIdRes> {
        try {
            const response = await this.httpClient.get("/posts/get-by-id/", dto.postId);

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getPostPage(dto: GetPostPageReq): Promise<GetPostPageRes> {
        try {
            const response = await this.httpClient.get("/posts/get-posts/", { ... dto});

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async create(dto: CreatePostReq): Promise<CreatePostRes> {
        try {
            const response = await this.httpClient.post("/posts/create", { ... dto}, dto.sesion.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response; 
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditPostReq): Promise<EditPostRes> {
        try {
            const response = await this.httpClient.put("/posts/edit", { ... dto}, dto.sesion.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    } 

    public async delete(dto: DeletePostReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/posts/delete", {...dto}, dto.sesion.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async toggleVotes(dto: TogglePostVotesReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/posts/toggle-votes", {...dto}, dto.sesion.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
    
}
