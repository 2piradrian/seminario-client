import type { DeleteUserReq } from "../dto/user/request/DeleteUserReq";
import type { EditUserReq } from "../dto/user/request/EditUserReq";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../dto/user/response/EditUserRes";
import type { GetUserByIdRes } from "../dto/user/response/GetUserByIdRes";

export abstract class UserRepositoryI {
    abstract getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
    abstract editUser(dto: EditUserReq): Promise<EditUserRes>;
    abstract deleteUser(dto: DeleteUserReq): Promise<void>;
}