import type { GetSearchResultFilteredReq } from "../dto/result/request/GetSearchResultFilteredReq";
import type { GetSearchResultFilteredRes } from "../dto/result/response/GetSearchResultFilteredRes";

export abstract class ResultDatasourceI {
    abstract getFiltered(dto: GetSearchResultFilteredReq): Promise<GetSearchResultFilteredRes>;
}
