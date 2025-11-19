import type { GetSearchResultFilteredReq } from "../dto/result/request/GetSearchResultFilteredReq";
import type { GetSearchResultFilteredRes } from "../dto/result/response/GetSearchResultFilteredRes";
import type { GetFeedPageReq } from "../dto/result/request/GetFeedPageReq";
import type { GetFeedPageRes } from "../dto/result/response/GetFeedPageRes";

export abstract class ResultRepositoryI {
    abstract getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes>;
    abstract getFeedPost(dto: GetFeedPageReq): Promise<GetFeedPageRes>;
}
