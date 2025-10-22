import { type ResultRepositoryI, type ResultDatasourceI, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes } from "../../domain";
import type { GetFeedPostPageReq } from "../../domain/dto/result/request/GetFeedPageReq";
import type { GetFeedPostPageRes } from "../../domain/dto/result/response/GetFeedPageRes";
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

    public async getFeedPost(dto: GetFeedPostPageReq): Promise<GetFeedPostPageRes> {
        try {
            return await this.dataSource.getFeedPost(dto);
        } 
        catch (error) {
            throw error;
        }
    }

}
