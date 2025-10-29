import type { EditUserReq } from "../dto/user/request/EditUserReq";
import type { GetOwnProfileReq } from "../dto/user/request/GetOwnProfile";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../dto/user/response/EditUserRes";
import type { GetOwnProfileRes } from "../dto/user/response/GetOwnProfileRes";
import type { GetUserByIdRes } from "../dto/user/response/GetUserByIdRes";

export abstract class UserProfileDataSourceI {
    abstract edit(dto: EditUserReq): Promise<EditUserRes>;
    abstract getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
    abstract getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes>;
}