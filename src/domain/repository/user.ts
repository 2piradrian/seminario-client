import type { EditUserReq } from "../dto/user/request/EditUserReq";
import type { GetUserByIdReq } from "../dto/user/request/GetUserByIdReq";
import type { EditUserRes } from "../dto/user/response/EditUserRes";
import type { GetUserByIdRes } from "../dto/user/response/GetUserByIdRes";
import type { GetAllStaffReq } from "../dto/auth/request/GetAllStaffReq";
import type { GetAllStaffRes } from "../dto/auth/response/GetAllStaffRes";
import type { DeleteUserReq } from "../dto/auth/request/DeleteUserReq";
import type { GetUserMutualsFollowersReq } from '../dto/user/request/GetUserMutualsFollowersReq';
import type { GetUserMutualsFollowersRes } from '../dto/user/response/GetUserMutualsFollowersRes';

export abstract class UserRepositoryI {
    abstract update(dto: EditUserReq): Promise<EditUserRes>;
    abstract getById(dto: GetUserByIdReq): Promise<GetUserByIdRes>;
    abstract getAllStaff(dto: GetAllStaffReq): Promise<GetAllStaffRes>;
    abstract delete(dto: DeleteUserReq): Promise<void>;
    abstract getMutualsFollowers(dto: GetUserMutualsFollowersReq): Promise<GetUserMutualsFollowersRes>;
}
