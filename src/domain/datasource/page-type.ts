import type { CreatePageTypeReq } from "../dto/page-type/request/CreatePageTypeReq";
import type { DeletePageTypeReq } from "../dto/page-type/request/DeletePageTypeReq";
import type { EditPageTypeReq } from "../dto/page-type/request/EditPageTypeReq";
import type { GetPageTypeByIdReq } from "../dto/page-type/request/GetPageTypeByIdReq";
import type { CreatePageTypeRes } from "../dto/page-type/response/CreatePageTypeRes";
import type { EditPageTypeRes } from "../dto/page-type/response/EditPageTypeRes";
import type { GetPageTypeByIdRes } from "../dto/page-type/response/GetPageTypeByIdRes";


export abstract class PageTypeDatasourceI {
    abstract getById(dto: GetPageTypeByIdReq): Promise<GetPageTypeByIdRes>;
    abstract create(dto: CreatePageTypeReq): Promise<CreatePageTypeRes>;
    abstract edit(dto: EditPageTypeReq): Promise<EditPageTypeRes>;
    abstract delete(dto: DeletePageTypeReq): Promise<void>;
}