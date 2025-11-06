import { HTTPClient } from "../../core";
import { type GetPostByIdRes, type GetPostByIdReq, type CreatePostReq, type CreatePostRes, type EditPostReq, type EditPostRes, type DeletePostReq, type GetPostPageReq, type GetPostPageRes, type TogglePostVotesReq, ErrorHandler, type Error, type PostDatasourceI, type GetOwnPostPageReq, type GetOwnPostPageRes, type GetPostPageByProfileReq, type GetPostPageByProfileRes, type TogglePostVotesRes } from "../../domain";

export class PostApiDataSource implements PostDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetPostByIdReq): Promise<GetPostByIdRes> {
        try {
            const response = await this.httpClient.get("/posts/get-by-id", dto.postId, dto.session.getAccessToken());

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
            const response = await this.httpClient.post("/posts/get-posts", { ... dto}, dto.session.getAccessToken());

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
            const response = await this.httpClient.post("/posts/create", { ... dto}, dto.session.getAccessToken());

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
            const response = await this.httpClient.patch("/posts/edit", { ... dto}, dto.session.getAccessToken());

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
            const response = await this.httpClient.delete("/posts/delete", { ... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async toggleVotes(dto: TogglePostVotesReq): Promise<TogglePostVotesRes> {
        try {
            const response = await this.httpClient.patch("/posts/toggle-votes", { ... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getOwnPostPage(dto: GetOwnPostPageReq): Promise<GetOwnPostPageRes> {
        try{
            const response = await this.httpClient.post("/posts/get-own-posts", { ... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }

    public async getPostPageByProfile(dto: GetPostPageByProfileReq): Promise<GetPostPageByProfileRes> {
        try{
            const response = await this.httpClient.post("/posts/get-by-profile", { ... dto}, dto.session.getAccessToken())

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response

        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }
    
}
