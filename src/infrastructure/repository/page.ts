import { type CreatePageReq, type EditPageReq, type DeletePageReq, type GetPageByIdReq, type GetPageByUserIdReq, type GetPageByIdRes, type GetPageByUserIdRes, PageDatasourceI, PageRepositoryI } from "../../domain";
import { PageApiDataSource } from "../datasource/page-api";

export class PageRepository implements PageRepositoryI {

    private dataSource: PageDatasourceI;

    constructor(datasource: PageDatasourceI = new PageApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getById(dto: GetPageByIdReq): Promise<GetPageByIdRes> {
        try {
            return await this.dataSource.getById(dto);
        } catch (error) {
            throw error;
        }
    }

    public async getByUserId(dto: GetPageByUserIdReq): Promise<GetPageByUserIdRes> {
        try {
            return await this.dataSource.getByUserId(dto);
        } catch (error) {
            throw error;
        }
    }

    public async create(dto: CreatePageReq): Promise<void> {
        try {
            return await this.dataSource.create(dto);
        } catch (error) {
            throw error; 
        }
    }

    public async edit(dto: EditPageReq): Promise<void> {
        try {
            return await this.dataSource.edit(dto);
        } catch (error) {
            throw error;
        }
    }

    public async delete(dto: DeletePageReq): Promise<void> {
        try {
            return await this.dataSource.delete(dto);
        } catch (error) {
            throw error; 
        }
    }
}
