import type {CatalogDataSourceI, CatalogRepositoryI, GetAllInstrumentRes, GetAllStyleRes, GetAllPageTypeRes, GetAllCategoryRes, GetAllPostTypeRes, GetAllModerationReasonRes} from "../../domain";
import type { GetContentTypeByIdReq } from "../../domain/dto/catalog/request/GetContentTypeByIdReq";
import type { GetAllContentTypeRes } from "../../domain/dto/catalog/response/GetAllContentTypeRes";
import type { GetAllModerationReasonRes } from "../../domain/dto/catalog/response/GetAllModerationReasonRes";
import type { GetContentTypeByIdRes } from "../../domain/dto/catalog/response/GetContentTypeByIdRes";
import { CatalogApiDataSource } from "../datasource/catalog-api";

export class CatalogRepository implements CatalogRepositoryI {

    private dataSource: CatalogDataSourceI;

    constructor(datasource: CatalogDataSourceI = new CatalogApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getAllStyle(): Promise<GetAllStyleRes> {
        try {
            return await this.dataSource.getAllStyle();
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllInstrument(): Promise<GetAllInstrumentRes> {
        try {
            return await this.dataSource.getAllInstrument();
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllPageType(): Promise<GetAllPageTypeRes> {
        try {
            return await this.dataSource.getAllPageType();
        }
        catch (error) {
            throw error;
        }
    }
    
    public async getAllCategory(): Promise<GetAllCategoryRes> {
        try {
            return await this.dataSource.getAllCategory();
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllContentType(): Promise<GetAllContentTypeRes> {
        try {
            return await this.dataSource.getAllContentType();
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllPostType(): Promise<GetAllPostTypeRes> {
        try {
            return await this.dataSource.getAllPostType();
        }
        catch (error) {
            throw error;
        }
    }

    public async getAllModerationReason(): Promise<GetAllModerationReasonRes> {
        try {
            return await this.dataSource.getAllModerationReason();
        }
        catch (error) {
            throw error;
        }
    }

    public async getContentTypeById(dto: GetContentTypeByIdReq): Promise<GetContentTypeByIdRes> {
        try {
            return await this.dataSource.getContentTypeById(dto);
        }
        catch (error) {
            throw error;
        }   
    }
}
