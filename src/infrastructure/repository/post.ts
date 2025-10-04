import { type GetPostByIdRes, type GetPostByIdReq, type CreatePostReq, type CreatePostRes, type EditPostReq, type EditPostRes, type DeletePostReq, type GetPostPageReq, type GetPostPageRes, 
         type TogglePostVotesReq, PostDatasourceI, PostRepositoryI, type GetOwnPostPageReq, type GetOwnPostPageRes, type GetPostPageByProfileReq, type GetPostPageByProfileRes } from "../../domain";
import { PostApiDataSource } from "../datasource/post-api";

export class PostRepository implements PostRepositoryI {
    
    private dataSource: PostDatasourceI;

    constructor(datasource: PostDatasourceI = new PostApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getById(dto: GetPostByIdReq): Promise<GetPostByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getPostPage(dto: GetPostPageReq): Promise<GetPostPageRes> {
        try {
            return await this.dataSource.getPostPage(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreatePostReq): Promise<CreatePostRes> {
        try {
            return await this.dataSource.create(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async edit(dto: EditPostReq): Promise<EditPostRes> {
        try {
            return await this.dataSource.edit(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeletePostReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async toggleVotes(dto: TogglePostVotesReq): Promise<void> {
        try {
            return await this.dataSource.toggleVotes(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getOwnPostPage(dto: GetOwnPostPageReq): Promise<GetOwnPostPageRes> {
        try {
            return await this.dataSource.getOwnPostPage(dto);
        }
        catch(error) {
            throw error;
        }
    }

    public async getPostPageByProfile(dto: GetPostPageByProfileReq): Promise<GetPostPageByProfileRes> {
        try {
            return await this.dataSource.getPostPageByProfile(dto);
        }
        catch(error) {
            throw error;
    }
    }

}
