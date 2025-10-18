import type { GetSearchResultFilteredReq } from "../dto/result/request/GetSearchResultFilteredReq";
import type { GetSearchResultFilteredRes } from "../dto/result/response/GetSearchResultFilteredRes";

export abstract class ResultRepositoryI {
    abstract getSearchResult(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes>;
}
