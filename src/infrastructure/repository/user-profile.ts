import type { EditUserReq, EditUserRes, GetOwnProfileReq, GetOwnProfileRes, GetUserByIdReq, GetUserByIdRes, UserProfileDataSourceI, UserProfileRepositoryI } from "../../domain";
import type { ToggleFollowReq } from "../../domain/dto/user/request/ToggleFollowReq";
import { UserProfileApiDataSource } from "../datasource/user-profile-api";

export class UserProfileRepository implements UserProfileRepositoryI {

    private dataSource: UserProfileDataSourceI;

    constructor(dataSource: UserProfileDataSourceI = new UserProfileApiDataSource()) {
        this.dataSource = dataSource;
    }

    public async getOwnProfile(dto: GetOwnProfileReq): Promise<GetOwnProfileRes> {
        try {
            return await this.dataSource.getOwnProfile(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getUserById(dto: GetUserByIdReq): Promise<GetUserByIdRes> {
        try {
            return await this.dataSource.getUserById(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async edit(dto: EditUserReq): Promise<EditUserRes> {
        try { 
            return await this.dataSource.edit(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async toggleFollow(dto: ToggleFollowReq): Promise<void> {
        try {
            return await this.dataSource.toggleFollow(dto);
        }
        catch (error) {
            throw error;
        }
    }

}