import type { CreatePageTypeReq, CreatePageTypeRes, CreatePostTypeReq, CreatePostTypeRes, DeletePageTypeReq, DeletePostTypeReq, EditPageTypeReq, EditPageTypeRes, EditPostTypeReq, EditPostTypeRes, GetPageTypeByIdReq, GetPageTypeByIdRes, GetPostTypeByIdReq, GetPostTypeByIdRes, PageTypeDatasourceI, PageTypeRepositoryI, PostTypeDatasourceI, PostTypeRepositoryI } from "../../domain";
import { PageTypeApiDataSource } from "../datasource/page-type-api";
import { PostTypeApiDataSource } from "../datasource/post-type-api";


export class PageTypeRepository implements PageTypeRepositoryI {
    
    private dataSource: PageTypeDatasourceI;

    constructor(datasource: PageTypeDatasourceI = new PageTypeApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getById(dto: GetPageTypeByIdReq): Promise<GetPageTypeByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async create(dto: CreatePageTypeReq): Promise<CreatePageTypeRes> {
        try {
            return await this.dataSource.create(dto);
        }
        catch (error) {
            throw error; 
        }
    }

    public async edit(dto: EditPageTypeReq): Promise<EditPageTypeRes> {
        try {
            return await this.dataSource.edit(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeletePageTypeReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        }
        catch (error) {
            throw error; 
        }
    }


}
