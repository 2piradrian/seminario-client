import type { BanUserReq } from "../dto/banneduser/request/BanUserReq";
import type { GetAllBannedUsersReq } from "../dto/banneduser/request/GetAllBannedUsersReq";
import type { GetAllBannedUsersRes } from "../dto/banneduser/response/GetAllBannedUsersReq";

export abstract class BannedUserRepositoryI {
    abstract ban(dto: BanUserReq): Promise<void>;
    abstract getAllBannedUsers(dto: GetAllBannedUsersReq): Promise<GetAllBannedUsersRes>;
}
