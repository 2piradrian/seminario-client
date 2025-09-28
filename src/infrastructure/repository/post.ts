import type { CreatePostReq, CreatePostRes } from "../../domain";
import type { PostDatasourceI } from "../../domain/datasource/post";
import type { DeletePostReq } from "../../domain/dto/post/request/DeletePostReq";
import type { EditPostReq } from "../../domain/dto/post/request/EditPostReq";
import type { GetPostByIdReq } from "../../domain/dto/post/request/GetPostByIdReq";
import type { EditPostRes } from "../../domain/dto/post/response/EditPostRes";
import type { GetPostByIdRes } from "../../domain/dto/post/response/GetPostByIdRes";
import type { PostRepositoryI } from "../../domain/repository/post";
import { PostApiDataSource } from "../datasource/post";

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

}
