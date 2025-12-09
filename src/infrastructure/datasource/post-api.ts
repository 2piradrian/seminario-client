import { HTTPClient } from "../../core";
import { type GetPostByIdRes, type GetPostByIdReq, type CreatePostReq, type CreatePostRes, type EditPostReq, type EditPostRes, type DeletePostReq, type GetPostPageReq, type GetPostPageRes, type TogglePostVotesReq, ErrorHandler, type Error, type PostDatasourceI, type GetOwnPostPageReq, type GetOwnPostPageRes, type GetPostPageByProfileReq, type GetPostPageByProfileRes, type TogglePostVotesRes } from "../../domain";

export class PostApiDataSource implements PostDatasourceI {

    private httpClient: HTTPClient;

    constructor() {
        this.httpClient = new HTTPClient();
    }

    public async create(dto: CreatePostReq): Promise<CreatePostRes> {
        try {
            const { session, ...payload } = dto;
            const response = await this.httpClient.post("/api/posts", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getById(dto: GetPostByIdReq): Promise<GetPostByIdRes> {
        try {
            const response = await this.httpClient.get(`/api/posts/get-by-id/${dto.postId}`, undefined, dto.session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getPosts(dto: GetPostPageReq): Promise<GetPostPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/posts/get-posts", params, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getPostsByProfile(dto: GetPostPageByProfileReq): Promise<GetPostPageByProfileRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/posts/get-by-profile", params, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getOwnPosts(dto: GetOwnPostPageReq): Promise<GetOwnPostPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/posts/get-own-posts", params, session.getAccessToken());

            if (response.error) {
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
            const { session, ...payload } = dto;
            const response = await this.httpClient.patch("/api/posts/toggle-votes", payload, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async edit(dto: EditPostReq): Promise<EditPostRes> {
        try {
            const { session, postId, ...payload } = dto;
            const response = await this.httpClient.put(`/api/posts/${postId}`, payload, session.getAccessToken());

            if (response.error) {
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
            const response = await this.httpClient.delete(`/api/posts/${dto.postId}`, undefined, dto.session.getAccessToken());

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
