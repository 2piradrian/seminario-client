import { type GetFollowerPageReq,type GetFollowerPageRes,type GetFollowingPageReq,type GetFollowingPageRes,type ToggleFollowReq,FollowDatasourceI, FollowRepositoryI, 
} from "../../domain";
import { FollowApiDataSource } from "../datasource/follow-api";

export class FollowRepository implements FollowRepositoryI {
    
    private dataSource: FollowDatasourceI;

    constructor(datasource: FollowDatasourceI = new FollowApiDataSource()) {
        this.dataSource = datasource;
    }
    
    public async getFollowers(dto: GetFollowerPageReq): Promise<GetFollowerPageRes> {
        try {
            return await this.dataSource.getFollowers(dto);
        }
        catch (error) {
            throw error;
        }
    }

    public async getFollowing(dto: GetFollowingPageReq): Promise<GetFollowingPageRes> {
        try {
            return await this.dataSource.getFollowing(dto);
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
