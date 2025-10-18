import { type ResultRepositoryI, type ResultDatasourceI, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes } from "../../domain";
import { ResultApiDataSource } from "../datasource/result-api";


export class ResultRepository implements ResultRepositoryI {
    
    private dataSource: ResultDatasourceI;

    constructor(datasource: ResultDatasourceI = new ResultApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes> {
        try {
            return await this.dataSource.getSearchResult(dto);
        } 
        catch (error) {
            throw error;
        }
    }

}
