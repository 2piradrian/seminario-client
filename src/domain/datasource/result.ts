import type { GetProfileFilteredReq } from "../dto/result/request/GetProfileFilteredReq";
import type { GetProfileFilteredRes } from "../dto/result/response/GetProfileFilteredRes";

export abstract class ResultDatasourceI {
    abstract getFiltered(dto: GetProfileFilteredReq): Promise<GetProfileFilteredRes>;
}
