import { HTTPClient } from "../../core";
import type { PostDatasourceI } from "../../domain/datasource/post";
import type { GetPostByIdReq } from "../../domain/dto/post/request/GetPostByIdReq";
import type { GetPostByIdRes } from "../../domain/dto/post/response/GetPostByIdRes";
import type { CreatePostReq } from "../../domain";
import type { CreatePostRes } from "../../domain";
import type { EditPostReq } from "../../domain/dto/post/request/EditPostReq";
import type { EditPostRes } from "../../domain/dto/post/response/EditPostRes";
import type { DeletePostReq } from "../../domain/dto/post/request/DeletePostReq";
import type { GetPostPageReq } from "../../domain/dto/post/request/GetPostPageReq";
import type { GetPostPageRes } from "../../domain/dto/post/response/GetPostPageRes";
import type { TogglePostVotesReq } from "../../domain/dto/post/request/TogglePostVotesReq";

export class PostApiDataSource implements PostDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getById(dto: GetPostByIdReq): Promise<GetPostByIdRes> {
        try {
            const response = await this.httpClient.get("/posts/get-by-id/", dto.postId);

            return response;
        } 
        catch (error) {
            throw error;
        }
    }

    public async getPostPage(dto: GetPostPageReq): Promise<GetPostPageRes> {
        try {
            const response = await this.httpClient.get("/posts/get-posts/", { ... dto});

            return response;
        } 
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreatePostReq): Promise<CreatePostRes> {
        try {
            const response = await this.httpClient.post("/posts/create", { ... dto}, dto.sesion.getAccessToken());

            return response; 
        } catch (error) {
            throw error;
        }
    }

    public async edit(dto: EditPostReq): Promise<EditPostRes> {
        try {
            const response = await this.httpClient.put("/posts/edit", { ... dto}, dto.sesion.getAccessToken());
            
            return response;
        }
        catch (error) {
            throw error; 
        }
    } 

    public async delete(dto: DeletePostReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/posts/delete", {...dto}, dto.sesion.getAccessToken());

            return response;
        }
        catch (error) {
            throw error;
        }
    }

    public async togleVotes(dto: TogglePostVotesReq): Promise<void> {
        try {
            const response = await this.httpClient.delete("/posts/toggle-votes", {...dto}, dto.sesion.getAccessToken());

            return response;
        }
        catch (error) {
            throw error;
        }
    }
    
}
