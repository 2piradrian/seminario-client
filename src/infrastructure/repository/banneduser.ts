import { type BanUserReq, BannedUserDataSourceI, BannedUserRepositoryI } from "../../domain";
import { BannedUserApiDataSource } from "../datasource/banneduser-api";

export class BannedUserRepository implements BannedUserRepositoryI {

    private dataSource: BannedUserDataSourceI;

    constructor(dataSource: BannedUserDataSourceI = new BannedUserApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async ban(dto: BanUserReq): Promise<void> {
        try {
            return await this.dataSource.ban(dto);
        }
        catch (error) {
            throw error;
        }
    }
}
