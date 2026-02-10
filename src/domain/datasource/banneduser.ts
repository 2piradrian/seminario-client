import type { BanUserReq } from "../dto/banneduser/request/BanUserReq";

export abstract class BannedUserDataSourceI {
    abstract ban(dto: BanUserReq): Promise<void>;
}
