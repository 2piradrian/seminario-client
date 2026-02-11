import type { BanUserReq } from "../dto/banneduser/request/BanUserReq";

export abstract class BannedUserRepositoryI {
    abstract ban(dto: BanUserReq): Promise<void>;
}
