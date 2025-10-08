import { HTTPClient } from "../../core";
import { CatalogDataSourceI, ErrorHandler, type GetAllInstrumentRes, type GetAllStyleRes, type GetAllCategoryRes, type GetAllPageTypeRes} from "../../domain";

export class CatalogApiDataSource implements CatalogDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getAllStyle(): Promise<GetAllStyleRes> {
        try {
            const response = await this.httpClient.get("/catalog/styles/get-all");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllInstrument(): Promise<GetAllInstrumentRes> {
        try {
            const response = await this.httpClient.get("/catalog/instruments/get-all");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllPageType(): Promise<GetAllPageTypeRes> {
        try {
            const response = await this.httpClient.get("/catalog/page-types/get-all");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllCategory(): Promise<GetAllCategoryRes> {
        try {
            const response = await this.httpClient.get("/catalog/categories/get-all");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }


}