import { HTTPClient } from "../../core";
import { type ResultDatasourceI, type GetSearchResultFilteredReq, type GetSearchResultFilteredRes, ErrorHandler, type Error } from "../../domain";
import type { GetFeedPostPageReq } from "../../domain/dto/result/request/GetFeedPageReq";
import type { GetFeedPostPageRes } from "../../domain/dto/result/response/GetFeedPageRes";

export class ResultApiDataSource implements ResultDatasourceI { 

    private httpClient: HTTPClient;

    constructor(){
        this.httpClient = new HTTPClient();
    }

    public async getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes> {
        try {
            const response = await this.httpClient.post("/results/get-search-result", { ... dto});

            if (response.error){
                throw ErrorHandler.handleError(response.error);
            }

            return response;
        } 
        catch (error) {
            throw ErrorHandler.handleError(error as Error);
        }
    }

    public async getFeedPost(dto: GetFeedPostPageReq): Promise<GetFeedPostPageRes> {
        try{
            const response = await this.httpClient.post("/results/get-feed-post", { ... dto}, dto.session.getAccessToken());

            if (response.error){
                throw ErrorHandler.handleError(response.error)
            }

            return response
        }
        catch (error){
            throw ErrorHandler.handleError(error as Error)
        }
    }   
    
}
