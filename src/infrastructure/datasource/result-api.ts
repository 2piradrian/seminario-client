import { HTTPClient } from "../../core";
import { type ResultDatasourceI, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, ErrorHandler, type Error, type GetFeedPageReq, type GetFeedPageRes, type GetFeedMergedByProfileIdPageReq, type GetFeedMergedByProfileIdPageRes } from "../../domain";

export class ResultApiDataSource implements ResultDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/results/get-search-result", params, session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getFeedPost(dto: GetFeedPageReq): Promise<GetFeedPageRes> {
        try{
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/results/get-feed-post", params, session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }   
    
    public async getMergedFeedPage(dto: GetFeedMergedByProfileIdPageReq): Promise<GetFeedMergedByProfileIdPageRes> {
        try {
            const { session, ...params } = dto;
            const response = await this.httpClient.get("/api/results/get-feed-merged", params, session.getAccessToken());

            if (response.error) {
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }
    
}
