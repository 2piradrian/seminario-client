import type { CreateStyleReq } from "../dto/style/request/CreateStyleReq";
import type { DeleteStyleReq } from "../dto/style/request/DeleteStyleReq";
import type { EditStyleReq } from "../dto/style/request/EditStyleReq";
import type { GetStyleByIdReq } from "../dto/style/request/GetStyleByIdReq";
import type { CreateStyleRes } from "../dto/style/response/CreateStyleRes";
import type { EditStyleRes } from "../dto/style/response/EditStyleRes";
import type { GetStyleByIdRes } from "../dto/style/response/GetStyleByIdRes";

export abstract class StyleDatasourceI {
    abstract getById(dto: GetStyleByIdReq): Promise<GetStyleByIdRes>;
    abstract create(dto: CreateStyleReq): Promise<CreateStyleRes>;
    abstract edit(dto: EditStyleReq): Promise<EditStyleRes>;
    abstract delete(dto: DeleteStyleReq): Promise<void>;
}
