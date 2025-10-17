import { type ResultRepositoryI, type ResultDatasourceI, type GetProfileFilteredReq, type GetProfileFilteredRes } from "../../domain";
import { ResultApiDataSource } from "../datasource/result-api";


export class ResultRepository implements ResultRepositoryI {
    
    private dataSource: ResultDatasourceI;

    constructor(datasource: ResultDatasourceI = new ResultApiDataSource()) {
        this.dataSource = datasource;
    }

    public async getFiltered(dto: GetProfileFilteredReq): Promise<GetProfileFilteredRes> {
        try {
            return await this.dataSource.getFiltered(dto);
        } 
        catch (error) {
            throw error;
        }
    }

}
