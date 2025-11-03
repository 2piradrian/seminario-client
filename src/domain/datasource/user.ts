import type { EditUserReq } from "../dto/user/request/EditUserReq";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../dto/user/response/EditUserRes";
import type { GetUserByIdRes } from "../dto/user/response/GetUserByIdRes";

export abstract class UserDataSourceI {
    abstract edit(dto: EditUserReq): Promise<EditUserRes>;
    abstract getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
}