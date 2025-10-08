import type {CatalogDataSourceI, CatalogRepositoryI, GetAllInstrumentRes, GetAllStyleRes, GetAllPageTypeRes, GetAllCategoryRes} from "../../domain";
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
    
}