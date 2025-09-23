import { HTTPClient } from "../../core";
import { CatalogDataSourceI, ErrorHandler, type GetAllInstrumentRes, type GetAllStyleRes } from "../../domain";

export class CatalogApiDataSource implements CatalogDataSourceI {

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getAllStyle(): Promise<GetAllStyleRes> {
        try {
            const response = await this.httpClient.get("/catalog/styles");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            const styles: GetAllStyleRes = response.styles || [];

            return styles;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getAllInstrument(): Promise<GetAllInstrumentRes> {
        try {
            const response = await this.httpClient.get("/catalog/instruments");

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            const styles: GetAllInstrumentRes = response.styles || [];

            return styles;
        }
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

}