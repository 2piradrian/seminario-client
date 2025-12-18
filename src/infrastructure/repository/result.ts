import { type ResultRepositoryI, type ResultDatasourceI, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, type GetFeedPageReq, type GetFeedPageRes, type GetFeedMergedByProfileIdPageReq, type GetFeedMergedByProfileIdPageRes } from "../../domain";
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

    public async getFeedPost(dto: GetFeedPageReq): Promise<GetFeedPageRes> {
        try {
            return await this.dataSource.getFeedPost(dto);
        } 
        catch (error) {
            throw error;
        }
    }

    public async getMergedFeedPage(dto: GetFeedMergedByProfileIdPageReq): Promise<GetFeedMergedByProfileIdPageRes> {
        try {
            return await this.dataSource.getMergedFeedPage(dto);
        }
        catch (error) {
            throw error;
        }
    }
}
