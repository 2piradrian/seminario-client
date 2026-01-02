import type { CreatePageReq } from "../dto/page/request/CreatePageReq";
import type { EditPageReq } from "../dto/page/request/EditPageReq";
import type { DeletePageReq } from "../dto/page/request/DeletePageReq";
import type { GetPageByIdReq } from "../dto/page/request/GetPageByIdReq";
import type { GetPageByUserIdReq } from "../dto/page/request/GetPageByUserIdReq";
import type { GetPageByIdRes } from "../dto/page/response/GetPageByIdRes";
import type { GetPageByUserIdRes } from "../dto/page/response/GetPageByUserIdRes";
import type { CreatePageRes } from "../dto/page/response/CreatePageRes";
import type { LeavePageReq } from "../dto/page/request/LeavePageReq";
import type { JoinPageReq } from "../dto/page/request/JoinPageReq";

export abstract class PageProfileDatasourceI {
    abstract getById(dto: GetPageByIdReq): Promise<GetPageByIdRes>;
    abstract getByUserId(dto: GetPageByUserIdReq): Promise<GetPageByUserIdRes>;
    abstract create(dto: CreatePageReq): Promise<CreatePageRes>;
    abstract edit(dto: EditPageReq): Promise<void>;
    abstract delete(dto: DeletePageReq): Promise<void>;
    abstract leave(dto: LeavePageReq): Promise<void>;
    abstract joinPage(dto: JoinPageReq): Promise<void>;
}
