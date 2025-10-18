import type { GetSearchResultFilteredReq } from "../dto/result/request/GetSearchResultFilteredReq";
import type { GetSearchResultFilteredRes } from "../dto/result/response/GetSearchResultFilteredRes";
import type { GetFeedPostPageReq } from "../dto/result/request/GetFeedPageReq";
import type { GetFeedPostPageRes } from "../dto/result/response/GetFeedPageRes";

export abstract class ResultDatasourceI {
    abstract getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes>;
    abstract getFeedPost(dto: GetFeedPostPageReq): Promise<GetFeedPostPageRes>;
}
