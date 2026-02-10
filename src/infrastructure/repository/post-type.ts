import type { CreatePostTypeReq, CreatePostTypeRes, DeletePostTypeReq, EditPostTypeReq, EditPostTypeRes, GetPostTypeByIdReq, GetPostTypeByIdRes, PostTypeDatasourceI, PostTypeRepositoryI } from "../../domain";
import { PostTypeApiDataSource } from "../datasource/post-type-api";


export class PostTypeRepository implements PostTypeRepositoryI {
    
    private dataSource: PostTypeDatasourceI;

    constructor(datasource: PostTypeDatasourceI = new PostTypeApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getById(dto: GetPostTypeByIdReq): Promise<GetPostTypeByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreatePostTypeReq): Promise<CreatePostTypeRes> {
        try {
            return await this.dataSource.create(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async edit(dto: EditPostTypeReq): Promise<EditPostTypeRes> {
        try {
            return await this.dataSource.edit(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeletePostTypeReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error; 
        }
    }


}
