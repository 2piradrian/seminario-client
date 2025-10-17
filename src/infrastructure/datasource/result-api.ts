import { HTTPClient } from "../../core";
import { type ResultDatasourceI, type GetProfileFilteredReq, type GetProfileFilteredRes, ErrorHandler, type Error } from "../../domain";

export class ResultApiDataSource implements ResultDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getFiltered(dto: GetProfileFilteredReq): Promise<GetProfileFilteredRes> {
        try {
            const response = await this.httpClient.post("/results/get-filtered", { ... dto});

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
