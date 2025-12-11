import type { GetSearchResultFilteredReq } from "../dto/result/request/GetSearchResultFilteredReq";
import type { GetSearchResultFilteredRes } from "../dto/result/response/GetSearchResultFilteredRes";
import type { GetFeedPageReq } from "../dto/result/request/GetFeedPageReq";
import type { GetFeedPageRes } from "../dto/result/response/GetFeedPageRes";
import type { GetFeedMergedByProfileIdPageReq } from "../dto/result/request/GetFeedMergedByProfileIdPageReq";
import type { GetFeedMergedByProfileIdPageRes } from "../dto/result/response/GetFeedMergedByProfileIdPageRes";

export abstract class ResultDatasourceI {
    abstract getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes>;
    abstract getFeedPost(dto: GetFeedPageReq): Promise<GetFeedPageRes>;
    abstract getFeedMerged(dto: GetFeedMergedByProfileIdPageReq): Promise<GetFeedMergedByProfileIdPageRes>
}
